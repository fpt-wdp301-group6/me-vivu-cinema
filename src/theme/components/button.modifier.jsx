export const MuiButton = {
    defaultProps: {
        variant: 'contained',
        disableElevation: true,
    },
    styleOverrides: {
        root: {
            minWidth: 64,
            borderRadius: 8,
            fontWeight: 600,
            textTransform: 'unset',
            transition:
                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
    },
};
