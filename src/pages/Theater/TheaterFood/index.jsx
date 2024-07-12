import { useRef, useState } from 'react';
import { Container, Modal } from '@mui/material';
import { Table, TheaterPicker } from '~/components';
import { constants, emitter, format } from '~/utils';
import api from '~/config/api';
import { toast } from 'react-toastify';
import TheaterFoodForm from './TheaterFoodForm';

const TheaterFood = () => {
    const [theater, setTheater] = useState();
    const [open, setOpen] = useState(false);

    const tableRef = useRef();

    const columns = [
        {
            id: 'name',
            header: 'Sản phẩm',
            valueGetter: (row) => (
                <div className="flex items-center gap-4">
                    <img className="object-cover w-20 rounded-md aspect-square" src={row.image} alt={row.name} />
                    <span>{row.name}</span>
                </div>
            ),
        },
        { id: 'description', header: 'Mô tả' },
        { id: 'price', header: 'Giá', valueGetter: (row) => format.price(row.price) },
    ];

    const buttons = [
        {
            text: 'Thêm',
            onClick: () => setOpen(true),
        },
    ];

    const reloadTable = (isUpdated) => {
        if (isUpdated) {
            tableRef.current.loadCurrentPage();
        } else {
            tableRef.current.loadFirstPage();
        }
    };

    const handleDelete = (event, item) => {
        const caller = () => {
            api.delete(`/foods/${theater}/${item._id}`)
                .then((res) => {
                    toast.success(res.message);
                    reloadTable(true);
                })
                .catch((err) => err.data?.message || constants.sthWentWrong);
        };

        emitter.confirm('Loại bỏ bắp nước', `Bạn có chắc muốn bỏ bắp nước ${item.name} khỏi rạp chiếu?`, caller);
    };

    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold">Danh sách thức ăn và thức uống</h1>
            <div className="mb-10">
                <TheaterPicker value={theater} onChange={(e) => setTheater(e.target.value)} />
            </div>
            {theater && (
                <>
                    <Table
                        ref={tableRef}
                        buttons={buttons}
                        columns={columns}
                        url={`/foods/${theater}`}
                        onDelete={handleDelete}
                    />
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <TheaterFoodForm columns={columns} theater={theater} reloadTable={reloadTable} />
                    </Modal>
                </>
            )}
        </Container>
    );
};

export default TheaterFood;
