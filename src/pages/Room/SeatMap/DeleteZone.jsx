import clsx from 'clsx';
import { useDrop } from 'react-dnd';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteZone = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'SEAT',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            className={clsx(
                'flex flex-col items-center justify-center gap-2 border rounded-md h-52 transition-colors',
                {
                    'bg-red-100 text-red-500': isOver,
                },
            )}
            ref={drop}
        >
            <DeleteIcon color={isOver ? 'error' : 'action'} />
            <div className="text-xs">Xóa ghế</div>
        </div>
    );
};

export default DeleteZone;
