import { useRef, useState } from 'react';
import { Container } from '@mui/material';
import { Panel, Table } from '~/components';
import TheaterForm from './TheaterForm';

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
        { id: 'address', header: 'Địa chỉ', valueGetter: (row) => `${row.address.detail}` },
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

    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold">Danh sách rạp chiếu phim</h1>
            <Table
                ref={tableRef}
                columns={columns}
                buttons={buttons}
                searchable
                url="/theaters/all"
                onEdit={(_, item) => handleOpen(item)}
                onDelete={() => {}}
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
