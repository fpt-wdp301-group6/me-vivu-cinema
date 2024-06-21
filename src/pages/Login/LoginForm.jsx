import { useAuth } from '~/hooks';
import { constants } from '~/utils';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, TextField } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const schema = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email').matches(constants.emailRegex, 'Email không hợp lệ'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
});

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { isLoading, isError, message, login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await login(data)
            .then(() => navigate(config.routes.cinema))
            .catch((err) => console.log(err));
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                color="secondary"
                label="Email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                color="secondary"
                label="Mật khẩu"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                type="password"
            />
            {isError && message && (
                <Alert variant="filled" severity="error">
                    {message}
                </Alert>
            )}
            <LoadingButton variant="contained" size="large" type="submit" loading={isLoading}>
                Đăng nhập
            </LoadingButton>
        </form>
    );
};

export default LoginForm;
