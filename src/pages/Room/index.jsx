import { useRef, useState } from 'react';
import { Container } from '@mui/material';
import { Panel, Table } from '~/components';
import { TheaterPicker } from '~/components';
import { constants, emitter } from '~/utils';
import api from '~/config/api';
import { toast } from 'react-toastify';
import RoomForm from './RoomForm';
import { useSearchQuery } from '~/hooks';

const Room = () => {
    const query = useSearchQuery();
    const [openPanel, setOpenPanel] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const [theaterId, setTheaterId] = useState(query.get('room'));
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
        { id: 'name', header: 'Tên phòng' },
        { id: 'seats', header: 'Số lượng ghế', valueGetter: (row) => `${row.seats.length}` },
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

    const handleOnChange = (e) => {
        setTheaterId(e.target.value);
    };

    const onDelete = (event, item) => {
        const caller = () => {
            api.delete(`/rooms/${item._id}`)
                .then((res) => {
                    toast.success(res.message);
                    reloadTable(true);
                })
                .catch((err) => err.data?.message || constants.sthWentWrong);
        };

        emitter.confirm('Xoá phòng chiếu', `Bạn có chắc muốn xoá phòng chiếu ${item.name}?`, caller);
    };

    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold">Danh sách phòng chiếu</h1>
            <div className="mb-10">
                <TheaterPicker value={theaterId} onChange={handleOnChange} />
            </div>
            {theaterId && (
                <Table
                    ref={tableRef}
                    columns={columns}
                    url={`/rooms/${theaterId}`}
                    buttons={buttons}
                    onEdit={(_, item) => handleOpen(item)}
                    onDelete={onDelete}
                />
            )}
            <Panel
                title={selectedItem ? 'Sửa phòng chiếu' : 'Tạo phòng chiếu'}
                open={openPanel}
                onClose={handleClose}
                buttons={panelButtons}
            >
                <RoomForm theaterId={theaterId} ref={formRef} item={selectedItem} reloadTable={reloadTable} />
            </Panel>
        </Container>
    );
};

export default Room;
