import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { DateTimePicker, MoviePicker } from '~/components';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import api from '~/config/api';
import { toast } from 'react-toastify';
import { constants } from '~/utils';
import moment from 'moment';

const schema = yup.object().shape({
    startAt: yup
        .date()
        .typeError('Vui lòng chọn thời gian khởi chiếu')
        .min(moment().add(2, 'hours').toDate(), 'Thời gian khởi chiếu phải sau thời điểm hiện tại ít nhất 2 tiếng'),
    movie: yup.string().required('Vui lòng chọn phim'),
    normal: yup.number().required('Vui lòng nhập giá cho ghế loại thường').typeError('Giá phải là số'),
    vip: yup.number(),
    couple: yup.number(),
});

const ShowtimeForm = forwardRef(({ item, start, theater, room, reloadCalendar }, ref) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const { movie, startAt, normal, vip, couple } = data;
        data = {
            theaterId: theater,
            room,
            movieId: movie,
            startAt,
            price: {
                normal,
                vip,
                couple,
            },
        };
        let caller;
        if (item) {
            caller = api.put(`/showtimes/${item?._id}`, data);
        } else {
            caller = api.post(`/showtimes`, data);
        }

        try {
            const res = await caller;
            reloadCalendar();
            toast.success(res.message);
        } catch (err) {
            toast.error(err.data?.message || constants.sthWentWrong);
        }
    };

    useImperativeHandle(ref, () => ({
        submit: handleSubmit(onSubmit),
    }));

    useEffect(() => {
        const defaultValues = {
            movie: item?.movie.id || '',
            startAt: item?.startAt || start || new Date(),
            normal: item?.price.normal || 0,
            vip: item?.price.vip || 0,
            couple: item?.price.couple || 0,
        };

        Object.keys(defaultValues).forEach((key) => {
            setValue(key, defaultValues[key]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);

    return (
        <form className="flex flex-col gap-10">
            <MoviePicker
                {...register('movie')}
                error={!!errors.movie}
                helperText={errors.movie?.message}
                defaultValue={item?.movie.id}
            />
            <DateTimePicker
                fullWidth
                {...register('startAt')}
                error={!!errors.startAt}
                helperText={errors.startAt?.message}
                defaultValue={item?.startAt || start || new Date()}
            />
            <div>
                <div className="flex gap-4">
                    <TextField
                        {...register('normal')}
                        id="outlined-basic"
                        label="Giá ghế thường"
                        variant="outlined"
                        error={!!errors.normal}
                        helperText={errors.normal?.message}
                    />
                    <TextField {...register('vip')} id="outlined-basic" label="Giá ghế VIP" variant="outlined" />
                    <TextField {...register('couple')} id="outlined-basic" label="Giá ghế đôi" variant="outlined" />
                </div>
            </div>
        </form>
    );
});

export default ShowtimeForm;
