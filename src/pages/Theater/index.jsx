import { Container } from '@mui/material';
import { Table } from '~/components';

const TheaterList = () => {
    const columns = [
        { id: 'name', header: 'Tên rạp', sortable: true },
        { id: 'address', header: 'Địa chỉ', valueGetter: (row) => `${row.address.detail}` },
    ];

    const buttons = [
        {
            text: 'Thêm',
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
        </Container>
    );
};

export default TheaterList;
