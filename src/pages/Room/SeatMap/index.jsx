import { useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Seat from './Seat';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '~/config/api';

const SeatMap = () => {
    const { roomId } = useParams();
    const [seats, setSeats] = useState(() => {
        return Array.from({ length: 12 }).map((arr) => Array.from({ length: 12 }));
    });

    const { data } = useSWR(`/rooms/${roomId}/seats`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    useEffect(() => {
        if (data) {
            const newSeats = [...seats];
            data.data.forEach((seat) => {
                newSeats[seat.y][seat.x] = seat;
            });
            setSeats(newSeats);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    console.log(seats);

    return (
        <div style={{ height: 'calc(100vh - 160px)' }}>
            <TransformWrapper centerOnInit centerZoomedOut limitToBounds minScale={0.2} maxScale={2} smooth>
                <TransformComponent wrapperStyle={{ maxWidth: '100%', width: '100%', height: '100%' }}>
                    <div className="flex flex-col gap-4 p-10 bg-slate-900">
                        <div className="text-center">
                            <div className="inline-block h-1 bg-white w-80"></div>
                            <div className="text-white">MÀN HÌNH</div>
                        </div>
                        <div
                            className="inline-grid flex-1 gap-2"
                            style={{
                                gridTemplate: `repeat(${12}, minmax(36px, 36px)) / repeat(${12}, minmax(36px, 36px))`,
                            }}
                        >
                            {seats.map((row, rowIndex) =>
                                row.map((seat, colIndex) => seat && <Seat seat={seat} x={colIndex} y={rowIndex} />),
                            )}
                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export default SeatMap;
