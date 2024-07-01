import clsx from 'clsx';
import { useDrag, useDrop } from 'react-dnd';
import { SeatType } from './constants';

const Seat = ({ seat, x, y, onClick }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'SEAT',
        item: { seat, x, y },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleClick = (event) => {
        onClick?.(event.currentTarget, { ...seat, x, y });
    };

    return (
        <div
            ref={drag}
            className={clsx(
                'flex items-center justify-center flex-shrink-0 text-xs text-white rounded-lg h-9 cursor-pointer',
                SeatType.color[seat.type],
                { 'invisible pointer-events-none': !seat.type },
                seat.type === SeatType.Couple ? 'w-20' : 'w-9',
                {
                    'opacity-50': isDragging,
                },
            )}
            onClick={handleClick}
        >
            {seat.name}
        </div>
    );
};

export const NoSeat = ({ x, y, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'SEAT',
        drop: (item) => onDrop(x, y, item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={clsx('flex-shrink-0 rounded-lg bg-white transition', isOver ? 'bg-opacity-50' : 'bg-opacity-20')}
        ></div>
    );
};

export default Seat;
