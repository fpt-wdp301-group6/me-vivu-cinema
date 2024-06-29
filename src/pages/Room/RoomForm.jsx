import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, TextField, Tooltip } from '@mui/material';
import { forwardRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import { useMount } from '~/hooks';
import api from '~/config/api';
import { constants, functions } from '~/utils';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { Link } from 'react-router-dom';
import config from '~/config';

const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên'),
});

const RoomForm = forwardRef(({ theaterId, item, reloadTable }, ref) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const sentData = { ...data, theaterId };
        let caller;

        if (item) {
            caller = api.put(`/rooms/${item._id}`, data);
        } else {
            caller = api.post('/rooms', sentData);
        }

        try {
            const res = await caller;
            toast.success(res.message);
            reloadTable(item);
        } catch (err) {
            toast.error(err.data?.message || constants.sthWentWrong);
        }
    };

    useImperativeHandle(ref, () => ({
        submit: handleSubmit(onSubmit),
    }));

    useMount(() => {
        if (item) {
            const defaultValues = {
                name: item.name || '',
            };

            Object.keys(defaultValues).forEach((key) => {
                setValue(key, defaultValues[key]);
            });
        }
    });

    return (
        <form className="flex items-center gap-3" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Tên rạp chiếu"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                className="flex-1"
            />
            {item && (
                <Tooltip title="Chỉnh sửa ghế">
                    <IconButton
                        size="large"
                        component={Link}
                        to={functions.replaceUrl(config.routes.room.seat, { roomId: item._id })}
                    >
                        <EventSeatIcon />
                    </IconButton>
                </Tooltip>
            )}
        </form>
    );
});

export default RoomForm;
