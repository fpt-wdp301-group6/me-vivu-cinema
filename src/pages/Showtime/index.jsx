import { Container, Paper } from '@mui/material';
import { Panel, TheaterPicker } from '~/components';
import * as yup from 'yup';
import Calendar from './Calendar';
import RoomPicker from '~/components/RoomPicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import ShowtimeForm from './ShowtimeForm';
import useSWR from 'swr';
import { fetcher } from '~/config/api';

const schema = yup.object().shape({
    theater: yup.string().required('Vui lòng chọn rạp chiếu'),
    room: yup.string().required('Vui lòng chọn phòng chiếu'),
});

const Showtime = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    // States
    const [selectedItem, setSelectedItem] = useState();
    const [openPanel, setOpenPanel] = useState(false);
    const [addedShowtimeStartAt, setAddedShowtimeStartAt] = useState();
    // Refs
    const formRef = useRef();
    const theater = watch('theater');
    const room = watch('room');

    const { data: showtimes, mutate } = useSWR(`/showtimes/${room}/listbyroom`, fetcher, {
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

    return (
        <Container className="py-8">
            <div className="flex items-center justify-between">
                <h1 className="mb-4 text-3xl font-bold">Lịch chiếu phim</h1>
            </div>
            <div className="flex flex-col gap-6 mb-10">
                <TheaterPicker
                    {...register('theater')}
                    error={!!errors.theater}
                    helperText={errors.theater?.message}
                    defaultValue={theater?._id}
                />
                <RoomPicker
                    theater={theater}
                    {...register('room')}
                    error={!!errors.room}
                    helperText={errors.room?.message}
                    defaultValue={room?._id}
                />
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
