import { LocalizationProvider } from '@mui/x-date-pickers';
import { theme } from '../theme';
import { ThemeProvider } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const MuiProvider = ({ children }) => {
    return (
        <ThemeProvider theme={theme()}>
            <LocalizationProvider dateAdapter={AdapterMoment}>{children}</LocalizationProvider>
        </ThemeProvider>
    );
};

export default MuiProvider;
