import { useRef } from 'react';
import { Container } from '@mui/material';
import { Table } from '~/components';

const Room = () => {
    const tableRef = useRef();

    const columns = [{ id: 'name', header: 'Tên phòng', sortable: true }];

    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold">Danh sách phòng chiếu</h1>
            <Table ref={tableRef} columns={columns} url="/rooms" />
        </Container>
    );
};

export default Room;
