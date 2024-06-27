import { useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Seat, { NoSeat } from './Seat';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '~/config/api';
import { Button } from '@mui/material';
import { emitter } from '~/utils';
import config from '~/config';

const SeatMap = () => {
    const { roomId } = useParams();
    const [seats, setSeats] = useState(() => {
        return Array.from({ length: 12 }).map((arr) => Array.from({ length: 12 }));
    });
    const navigate = useNavigate();

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

    const handleCancel = () => {
        emitter.confirm('Huỷ chỉnh sửa', 'Bạn có chắc sẽ huỷ tiến trình này không? Những thay đổi sẽ mất', () => {
            navigate(config.routes.room.base);
        });
    };

    return (
        <div style={{ height: 'calc(100vh - 144px)' }}>
            <div className="relative flex h-full -m-4">
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
                                    row.map((seat, colIndex) =>
                                        seat ? (
                                            <Seat seat={seat} key={seat._id} x={colIndex} y={rowIndex} />
                                        ) : (
                                            <NoSeat key={`${rowIndex}${colIndex}`} x={colIndex} y={rowIndex} />
                                        ),
                                    ),
                                )}
                            </div>
                        </div>
                    </TransformComponent>
                </TransformWrapper>
                <div className="h-full bg-white border-l w-80"></div>
                <div className="absolute left-0 right-0 flex items-center justify-end h-20 gap-2 px-4 bg-white border-t top-full">
                    <Button size="large" variant="outlined" color="secondary" onClick={handleCancel}>
                        Huỷ
                    </Button>
                    <Button size="large">Lưu</Button>
                </div>
            </div>
        </div>
    );
};

export default SeatMap;
