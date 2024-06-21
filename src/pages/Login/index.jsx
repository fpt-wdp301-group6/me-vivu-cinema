import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    return (
        <Stack gap={4} width="100%" maxWidth={400} padding={2}>
            <h2 className="text-3xl font-bold text-center">
                Đăng nhập
                <Link to="/" className="ml-2">
                    me<span className="text-primary">Vivu</span>
                </Link>
            </h2>
            <Button variant="outlined" color="secondary" size="large" startIcon={<GoogleIcon />}>
                Đăng nhập với Google
            </Button>
            <span className="text-sm text-center text-gray-400">hoặc Đăng nhập với email</span>
            <LoginForm />
            <span className="text-sm text-center text-gray-400">
                Bạn chưa có tài khoản?
                <Link href="/dang-ky" className="ml-1 text-white underline">
                    Đăng ký
                </Link>
            </span>
        </Stack>
    );
};

export default Login;
