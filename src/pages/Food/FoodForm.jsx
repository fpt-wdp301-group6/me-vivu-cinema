import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import React, { forwardRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import { useMount } from '~/hooks';
import api from '~/config/api';
import { constants } from '~/utils';

const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên'),
    description: yup.string().required('Vui lòng nhập mô tả'),
    price: yup.string().required('Vui lòng nhập giá'),
    image: yup.string(),
});

const FoodForm = forwardRef(({ item, reloadTable }, ref) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        let caller;
        const { name, description, price, image } = data;
        const formData = { name, description, price, image };

        if (item) {
            caller = api.put(`/foods/${item._id}`, formData);
        } else {
            caller = api.post('/foods', formData);
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
                description: item.description || '',
                price: item.price || '',
                image: item.price || '',
            };

            Object.keys(defaultValues).forEach((key) => {
                setValue(key, defaultValues[key]);
            });
        }
    });

    return (
        <form className="grid grid-cols-1 gap-x-4 gap-y-6" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Tên thức ăn/đồ uống "
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <TextField
                label="Mô tả"
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
            />
            <TextField
                label="Giá sản phẩm"
                {...register('price')}
                error={!!errors.price}
                helperText={errors.price?.message}
            />
            <TextField type="file" {...register('image')} error={!!errors.image} helperText={errors.image?.message} />
        </form>
    );
});

export default FoodForm;
