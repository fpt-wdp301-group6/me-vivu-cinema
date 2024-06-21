import { CityPicker, DistrictPicker, WardPicker } from '~/components';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên'),
    city: yup.string().required('Vui lòng chọn tỉnh thành'),
    district: yup.string().required('Vui lòng chọn quận huyện'),
    ward: yup.string(),
    street: yup.string().required('Vui lòng chọn địa chỉ tòa nhà, tên đường'),
});

const TheaterForm = forwardRef(({ item = {} }, ref) => {
    const defaultValues = {
        name: item.name || '',
        city: item.address?.city || '',
        district: item.address?.district || '',
        ward: item.address?.ward || '',
        street: item.address?.street || '',
    };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const city = watch('city');
    const district = watch('district');

    const onSubmit = (data) => {
        console.log(data);
    };

    useImperativeHandle(ref, () => ({
        submit: handleSubmit(onSubmit),
    }));

    useEffect(() => {
        if (item) {
            Object.keys(defaultValues).forEach((key) => {
                setValue(key, defaultValues[key]);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item, setValue]);

    return (
        <form className="grid grid-cols-1 gap-x-4 gap-y-6" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Tên rạp chiếu"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <CityPicker
                {...register('city')}
                error={!!errors.city}
                helperText={errors.city?.message}
                defaultValue={item.address?.city}
            />
            <DistrictPicker
                city={city}
                {...register('district')}
                error={!!errors.district}
                helperText={errors.district?.message}
                defaultValue={item.address?.district}
            />
            <WardPicker district={district} {...register('ward')} defaultValue={item.address?.ward} />
            <TextField
                label="Tòa nhà, tên đường"
                {...register('street')}
                error={!!errors.street}
                helperText={errors.street?.message}
            />
        </form>
    );
});

export default TheaterForm;
