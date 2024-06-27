const Seat = ({ seat, x, y }) => {
    return (
        <button
            className="flex items-center justify-center flex-shrink-0 text-xs text-white bg-red-500 rounded-lg"
            style={{ gridColumn: x + 1, gridRow: y + 1 }}
        >
            {seat.name}
        </button>
    );
};

export const NoSeat = ({ x, y }) => {
    return (
        <button className="flex-shrink-0 rounded-lg bg-white/20" style={{ gridColumn: x + 1, gridRow: y + 1 }}></button>
    );
};

export default Seat;
