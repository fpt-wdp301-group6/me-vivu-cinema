import { Button, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SimpleBar from 'simplebar-react';

const Panel = ({
    children,
    title,
    onClose,
    buttons,
    anchor = 'right',
    open = false,
    width = 664,
    hideBackdrop = false,
}) => {
    return (
        <Drawer anchor={anchor} open={open} onClose={onClose} hideBackdrop={hideBackdrop}>
            <div style={{ width }} className="flex flex-col h-full">
                <div className="px-6">
                    <div className="flex items-center justify-between h-16 border-b">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="flex-1 overflow-hidden">
                    <SimpleBar className="h-full p-6">{children}</SimpleBar>
                </div>
                {buttons && (
                    <div className="flex items-center justify-end gap-2 p-4 border-t">
                        {buttons.map((button, index) => (
                            <Button size="large" key={button.id || index} {...button}>
                                {button.text}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </Drawer>
    );
};

export default Panel;
