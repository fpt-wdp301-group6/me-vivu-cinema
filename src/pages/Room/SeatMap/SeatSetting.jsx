import { memo } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Seat, { NoSeat } from './Seat';
import { v4 } from 'uuid';

const SeatSetting = ({ seats, onDropSeat, disabled, onSeatClick }) => {
    return (
        <TransformWrapper
            centerOnInit
            centerZoomedOut
            limitToBounds
            minScale={0.2}
            maxScale={2}
            smooth
            disabled={disabled}
        >
            <TransformComponent wrapperStyle={{ maxWidth: '100%', width: '100%', height: '100%' }}>
                <div className="flex flex-col gap-4 p-10 bg-slate-900">
                    <div className="text-center">
                        <div className="inline-block h-1 bg-white w-80"></div>
                        <div className="text-white">MÀN HÌNH</div>
                    </div>
                    <div
                        className="inline-grid flex-1 gap-2"
                        style={{
                            gridTemplate: `repeat(${seats.length}, minmax(36px, 36px)) / repeat(${seats[0].length}, minmax(36px, 36px))`,
                        }}
                    >
                        {seats.map((row, rowIndex) =>
                            row.map((seat, colIndex) =>
                                seat ? (
                                    <Seat key={v4()} seat={seat} x={colIndex} y={rowIndex} onClick={onSeatClick} />
                                ) : (
                                    <NoSeat key={v4()} x={colIndex} y={rowIndex} onDrop={onDropSeat} />
                                ),
                            ),
                        )}
                    </div>
                </div>
            </TransformComponent>
        </TransformWrapper>
    );
};

export default memo(SeatSetting);
