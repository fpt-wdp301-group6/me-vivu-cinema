import { Avatar, ButtonBase, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useAuth } from '~/hooks';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="fixed top-0 left-[260px] right-0 z-50">
            <div className="flex items-center justify-between h-16 px-4 py-2 bg-white border-b">
                <TextField
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="⌘ + K"
                />
                <div className="flex items-center gap-2">
                    <Tooltip title="Thông báo">
                        <IconButton>
                            <NotificationsOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <ButtonBase sx={{ borderRadius: 2 }} onClick={logout}>
                        <div className="flex items-center gap-2 p-1">
                            <Avatar sx={{ width: 28, height: 28 }} src={user?.avatar} />
                            <h6 className="font-medium">{user?.name}</h6>
                        </div>
                    </ButtonBase>
                </div>
            </div>
        </header>
    );
};

export default Header;
