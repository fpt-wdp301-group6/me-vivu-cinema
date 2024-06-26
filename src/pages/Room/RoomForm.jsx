import { CityPicker, DistrictPicker, WardPicker } from '~/components';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { forwardRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import { useMount } from '~/hooks';
import api from '~/config/api';
import { constants } from '~/utils';
import TheaterPicker from '~/components/TheaterPicker';

const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên'),
    city: yup.string().required('Vui lòng chọn tỉnh thành'),
    district: yup.string().required('Vui lòng chọn quận huyện'),
    ward: yup.string(),
    street: yup.string().required('Vui lòng chọn địa chỉ tòa nhà, tên đường'),
});

const RoomForm = forwardRef(({ item, reloadTable }, ref) => {
    const {
        register,
        handleSubmit,
        setValue,
        // watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (data) => {
        let caller;
        const { name } = data;
        const formData = { name };

        if (item) {
            caller = api.put(`/theaters/${item._id}`, formData);
        } else {
            caller = api.post('/theaters', formData);
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
            {!item && <TheaterPicker />}
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
