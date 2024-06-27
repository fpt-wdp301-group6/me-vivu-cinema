const Seat = ({ seat, x, y }) => {
    return (
        <button
            className="flex items-center justify-center flex-shrink-0 col-span-2 text-xs text-white bg-red-500 rounded-lg"
            style={{ gridColumn: x + 1, gridRow: y + 1 }}
        >
            {seat.name}
        </button>
    );
};

export default Seat;
