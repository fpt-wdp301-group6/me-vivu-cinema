import { Container, Paper } from '@mui/material';
import { TheaterPicker } from '~/components';
import Calendar from './Calendar';

// import { constants, emitter } from '~/utils';
// import api from '~/config/api';
// import { toast } from 'react-toastify';
// import RoomForm from './RoomForm';

const Showtime = () => {
    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold">Lịch chiếu phim</h1>
            <div className="mb-10">
                <TheaterPicker />
                <Paper className="mt-6 p-4">
                    <Calendar />
                </Paper>
            </div>
        </Container>
    );
};

export default Showtime;
