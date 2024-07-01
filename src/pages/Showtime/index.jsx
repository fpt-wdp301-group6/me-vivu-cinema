import { Container, Paper } from '@mui/material';
import { TheaterPicker } from '~/components';
import * as yup from 'yup';
import Calendar from './Calendar';
import RoomPicker from '~/components/RoomPicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

    const theater = watch('theater');
    const room = watch('room');

    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold">Lịch chiếu phim</h1>
            <div className="mb-10 flex flex-col gap-6">
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
                <Paper className="mt-6 p-4">
                    <Calendar />
                </Paper>
            </div>
        </Container>
    );
};

export default Showtime;
