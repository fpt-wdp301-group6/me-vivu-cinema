import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { toast } from 'react-toastify';
import { useMount } from '~/hooks';
import api from '~/config/api';
import { constants } from '~/utils';

const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên'),
    description: yup.string().required('Vui lòng nhập mô tả'),
    price: yup.number().required('Vui lòng nhập giá').typeError('Giá phải là số'),
    image: yup
        .mixed((input) => input instanceof FileList)
        .test('haswatchImage', 'Vui lòng chọn ảnh watchImage', (value) => {
            if (!value || !value.length) return false;
            return true;
        }),
});

const FoodForm = forwardRef(({ item, reloadTable }, ref) => {
    const [inputImage, setInputImage] = useState();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const watchImage = watch('image');

    useEffect(() => {
        if (watchImage && watchImage.length > 0) {
            const url = URL.createObjectURL(watchImage[0]);
            setInputImage(url);

            return () => URL.revokeObjectURL(url);
        }
    }, [watchImage]);

    const onSubmit = async (data) => {
        let caller;
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof FileList) {
                for (let i = 0; i < value.length; i++) {
                    formData.append(key, value[i]);
                }
            } else {
                formData.append(key, value.toString());
            }
        });
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
            <TextField
                inputProps={{ accept: 'image/*' }}
                type="file"
                {...register('image')}
                error={!!errors.image}
                helperText={errors.image?.message}
            />
            {inputImage && (
                <img
                    className="rounded-md w-80 object-contain bg-gray-300 aspect-square"
                    src={inputImage}
                    alt={'popcorn'}
                />
            )}
        </form>
    );
});

export default FoodForm;
