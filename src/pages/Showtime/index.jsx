import { Container, Paper } from '@mui/material';
import { Panel, TheaterPicker } from '~/components';
import Calendar from './Calendar';
import RoomPicker from '~/components/RoomPicker';
import { useRef, useState } from 'react';
import ShowtimeForm from './ShowtimeForm';
import useSWR from 'swr';
import api, { fetcher } from '~/config/api';
import { toast } from 'react-toastify';
import { constants, emitter } from '~/utils';

const Showtime = () => {
    // States
    const [selectedItem, setSelectedItem] = useState();
    const [openPanel, setOpenPanel] = useState(false);
    const [addedShowtimeStartAt, setAddedShowtimeStartAt] = useState();
    const [theater, setTheater] = useState();
    const [room, setRoom] = useState();
    // Refs
    const formRef = useRef();

    const { data: showtimes, mutate } = useSWR(`/showtimes/${room}/listbyroom`, room ? fetcher : null, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    // Actions
    const handleOpenAddPanel = (start) => {
        setOpenPanel(true);
        setAddedShowtimeStartAt(start);
    };

    const handleClose = () => {
        setOpenPanel(false);
        setSelectedItem(null);
        setAddedShowtimeStartAt(null);
    };

    const handleOpenEditPanel = (showtime) => {
        setOpenPanel(true);
        setSelectedItem(showtime);
    };

    const panelButtons = [
        {
            text: 'Hủy',
            color: 'secondary',
            variant: 'outlined',
            onClick: handleClose,
        },
        {
            text: 'Xóa',
            color: 'secondary',
            variant: 'outlined',
            hide: !selectedItem,
            onClick: () => handleDelete(selectedItem),
        },
        {
            text: 'Lưu',
            onClick: () => {
                formRef.current.submit();
            },
        },
    ];

    const reloadCalendar = () => {
        mutate();
        setOpenPanel(false);
    };

    const handleDelete = (selectedItem) => {
        const caller = () => {
            api.delete(`/showtimes/${selectedItem._id}`)
                .then((res) => {
                    toast.success(res.message);
                    reloadCalendar();
                })
                .catch((err) => err.data?.message || constants.sthWentWrong);
        };

        emitter.confirm(
            'Xoá lịch chiếu',
            `Bạn có chắc muốn xoá lịch chiếu phim ${selectedItem.movieId.title}?`,
            caller,
        );
    };

    return (
        <Container className="py-8">
            <div className="flex items-center justify-between">
                <h1 className="mb-4 text-3xl font-bold">Lịch chiếu phim</h1>
            </div>
            <div className="flex flex-col gap-6 mb-10">
                <TheaterPicker value={theater} onChange={(e) => setTheater(e.target.value)} />
                <RoomPicker theater={theater} value={room} onChange={(e) => setRoom(e.target.value)} />
                <Paper className="p-4 mt-6">
                    <Calendar
                        showtimes={showtimes}
                        onSelect={handleOpenAddPanel}
                        onEventClick={handleOpenEditPanel}
                        room={room}
                    />
                </Paper>
                <Panel
                    title={selectedItem ? 'Chỉnh sửa lịch chiếu phim' : 'Thêm lịch chiếu phim'}
                    open={openPanel}
                    onClose={handleClose}
                    buttons={panelButtons}
                >
                    <ShowtimeForm
                        theater={theater}
                        room={room}
                        ref={formRef}
                        start={addedShowtimeStartAt}
                        item={selectedItem}
                        reloadCalendar={reloadCalendar}
                    />
                </Panel>
            </div>
        </Container>
    );
};

export default Showtime;
