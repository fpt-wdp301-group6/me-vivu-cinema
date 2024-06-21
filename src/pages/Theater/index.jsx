import { useState } from 'react';
import { Container } from '@mui/material';
import { Table } from '~/components';
import Panel from '~/components/Panel';

const TheaterList = () => {
    const [openPanel, setOpenPanel] = useState(false);

    const columns = [
        { id: 'name', header: 'Tên rạp', sortable: true },
        { id: 'address', header: 'Địa chỉ', valueGetter: (row) => `${row.address.detail}` },
    ];

    const buttons = [
        {
            text: 'Thêm',
            onClick: () => setOpenPanel(true),
        },
    ];

    const panelButtons = [
        {
            text: 'Hủy',
            color: 'secondary',
            variant: 'outlined',
            onClick: () => setOpenPanel(false),
        },
        {
            text: 'Lưu',
        },
    ];

    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold">Danh sách rạp chiếu phim</h1>
            <Table
                columns={columns}
                buttons={buttons}
                searchable
                url="/theaters/all"
                onEdit={() => {}}
                onDelete={() => {}}
            />
            <Panel title="Tạo rạp" open={openPanel} onClose={() => setOpenPanel(false)} buttons={panelButtons}>
                <div className="h-[10000px]">Test</div>
            </Panel>
        </Container>
    );
};

export default TheaterList;
