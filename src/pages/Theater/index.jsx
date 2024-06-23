import { useRef, useState } from 'react';
import { Container } from '@mui/material';
import { Panel, Table } from '~/components';
import TheaterForm from './TheaterForm';
import { constants, emitter } from '~/utils';
import api from '~/config/api';
import { toast } from 'react-toastify';

const TheaterList = () => {
    const [openPanel, setOpenPanel] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const formRef = useRef();
    const tableRef = useRef();

    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpenPanel(true);
    };

    const handleClose = () => {
        setOpenPanel(false);
    };

    const columns = [
        { id: 'name', header: 'Tên rạp', sortable: true },
        { id: 'address.detail', header: 'Địa chỉ', valueGetter: (row) => `${row.address.detail}` },
    ];

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

    const reloadTable = (isUpdated) => {
        if (isUpdated) {
            tableRef.current.loadCurrentPage();
        } else {
            tableRef.current.loadFirstPage();
        }
        handleClose();
    };

    const onDelete = (event, item) => {
        const caller = () => {
            api.delete(`/theaters/${item._id}/force`)
                .then((res) => {
                    toast.success(res.message);
                    reloadTable(true);
                })
                .catch((err) => err.data?.message || constants.sthWentWrong);
        };

        emitter.confirm('Xoá rạp chiếu', `Bạn có chắc muốn xoá rạp chiếu ${item.name}?`, caller);
    };

    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold">Danh sách rạp chiếu phim</h1>
            <Table
                ref={tableRef}
                columns={columns}
                buttons={buttons}
                searchable
                pagination
                url="/theaters/all"
                onEdit={(_, item) => handleOpen(item)}
                onDelete={onDelete}
            />
            <Panel
                title={selectedItem ? 'Sửa rạp chiếu' : 'Tạo rạp chiếu'}
                open={openPanel}
                onClose={handleClose}
                buttons={panelButtons}
            >
                <TheaterForm ref={formRef} item={selectedItem} reloadTable={reloadTable} />
            </Panel>
        </Container>
    );
};

export default TheaterList;
