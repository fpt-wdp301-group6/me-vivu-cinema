import { theme } from '../theme';
import { ThemeProvider } from '@mui/material';

const MuiProvider = ({ children }) => {
    return <ThemeProvider theme={theme()}>{children}</ThemeProvider>;
};

export default MuiProvider;
