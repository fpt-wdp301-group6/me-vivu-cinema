import { useRef, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import { Panel, Table } from '~/components';
import api from '~/config/api';
import { constants, emitter, format } from '~/utils';
import FoodForm from './FoodForm';

const Food = () => {
    // States
    const [selectedItem, setSelectedItem] = useState();
    const [openPanel, setOpenPanel] = useState(false);

    // Refs
    const formRef = useRef();
    const tableRef = useRef();

    // Actions
    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpenPanel(true);
    };
    const handleClose = () => {
        setOpenPanel(false);
    };
    const onDelete = (event, item) => {
        const caller = () => {
            api.delete(`/foods/${item._id}`)
                .then((res) => {
                    toast.success(res.message);
                    reloadTable(true);
                })
                .catch((err) => err.data?.message || constants.sthWentWrong);
        };

        emitter.confirm('Xoá thức ăn/thức uống', `Bạn có chắc muốn xoá ${item.name}?`, caller);
    };
    const reloadTable = (isUpdated) => {
        if (isUpdated) {
            tableRef.current.loadCurrentPage();
        } else {
            tableRef.current.loadFirstPage();
        }
        handleClose();
    };

    const columns = [
        { id: 'name', header: 'Tên sản phẩm' },
        { id: 'description', header: 'Mô tả' },
        { id: 'image', header: 'Hình ảnh' },
        { id: 'price', header: 'Giá', valueGetter: (row) => format.price(row.price) },
    ];

    // Buttons
    const buttons = [
        {
            text: 'Thêm',
            onClick: () => handleOpen(),
        },
    ];
    const panelButtons = [
        {
            text: 'Hủy',
            color: 'secondary',
            variant: 'outlined',
            onClick: handleClose,
        },
        {
            text: 'Lưu',
            onClick: () => formRef.current.submit(),
        },
    ];

    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold">Danh sách thức ăn và thức uống</h1>
            <Table
                ref={tableRef}
                columns={columns}
                buttons={buttons}
                searchable
                url="/foods"
                onEdit={(_, item) => handleOpen(item)}
                onDelete={onDelete}
            />
            <Panel
                title={selectedItem ? 'Chỉnh sửa món ăn/thức uống' : 'Thêm món ăn/thức uống'}
                open={openPanel}
                onClose={handleClose}
                buttons={panelButtons}
            >
                <FoodForm ref={formRef} item={selectedItem} reloadTable={reloadTable} />
            </Panel>
        </Container>
    );
};

export default Food;
