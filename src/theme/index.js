import { createTheme } from '@mui/material';
import { components } from './components';
import { palette } from './palette';

export const theme = () => {
    return createTheme({ components, palette });
};
