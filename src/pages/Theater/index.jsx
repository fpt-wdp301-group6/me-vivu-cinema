import { Container } from '@mui/material';
import Table from '~/components/Table';
import api from '~/config/api';

const TheaterList = () => {
    const columns = [
        { header: 'Tên rạp', sortable: true, id: 'name' },
        { header: 'Mô tả', width: 400, id: 'slug' },
    ];

    const buttons = [
        {
            text: 'Thêm',
        },
    ];

    const loadData = () => {
        return api.get('/theaters/all');
    };

    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold">Danh sách rạp chiếu phim</h1>
            <Table columns={columns} buttons={buttons} searchable onLoadData={loadData} />
        </Container>
    );
};

export default TheaterList;
