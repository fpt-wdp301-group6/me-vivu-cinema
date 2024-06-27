import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { forwardRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import { useMount } from '~/hooks';
import api from '~/config/api';
import { constants } from '~/utils';

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
        <form className="grid grid-cols-1 gap-x-4 gap-y-6" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Tên rạp chiếu"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />
        </form>
    );
});

export default RoomForm;
