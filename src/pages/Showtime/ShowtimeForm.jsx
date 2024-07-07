import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { DateTimePicker } from '~/components';

const schema = yup.object().shape({
    startAt: yup.date().typeError('Vui lòng chọn thời gian khởi chiếu'),
});

const ShowtimeForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DateTimePicker
                fullWidth
                {...register('startAt')}
                error={!!errors.startAt}
                helperText={errors.startAt?.message}
            />
            <Button type="submit">OK</Button>
        </form>
    );
};

export default ShowtimeForm;
