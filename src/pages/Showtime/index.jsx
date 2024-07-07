import { Button, Container, Paper } from '@mui/material';
import { Panel, TheaterPicker } from '~/components';
import * as yup from 'yup';
import Calendar from './Calendar';
import RoomPicker from '~/components/RoomPicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import ShowtimeForm from './ShowtimeForm';
// import { emitter } from '~/utils';
// import { toast } from 'react-toastify';
// import api from '~/config/api';

// import { constants, emitter } from '~/utils';
// import api from '~/config/api';
// import { toast } from 'react-toastify';
// import RoomForm from './RoomForm';

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

    // Refs
    const formRef = useRef();

    const theater = watch('theater');
    const room = watch('room');
    // Actions
    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpenPanel(true);
    };
    const handleClose = () => {
        setOpenPanel(false);
    };
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

    // const onDelete = (event, item) => {
    //     const caller = () => {
    //         api.delete(`/foods/${item._id}`)
    //             .then((res) => {
    //                 toast.success(res.message);
    //             })
    //             .catch((err) => err.data?.message || constants.sthWentWrong);
    //     };

    //     emitter.confirm('Xoá thức ăn/thức uống', `Bạn có chắc muốn xoá ${item.name}?`, caller);
    // };
    return (
        <Container className="py-8">
            <div className="flex items-center justify-between">
                <h1 className="mb-4 text-3xl font-bold">Lịch chiếu phim</h1>
                <Button onClick={() => handleOpen()} className="h-10">
                    Add
                </Button>
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
                    <Calendar room={room} />
                </Paper>
                <Panel
                    title={selectedItem ? 'Chỉnh sửa lịch chiếu phim' : 'Thêm lịch chiếu phim'}
                    open={openPanel}
                    onClose={handleClose}
                    buttons={panelButtons}
                >
                    <ShowtimeForm />
                </Panel>
            </div>
        </Container>
    );
};

export default Showtime;
