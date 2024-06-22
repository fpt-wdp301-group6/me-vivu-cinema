import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useMount } from '~/hooks';
import { eventEmitter } from '~/utils/emitter';

const ConfirmDialog = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({ title: '', content: '' });

    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        data?.confirmCb?.();
        handleClose();
    };

    useMount(() => {
        const onConfirm = (eventData) => {
            setData(eventData);
            setOpen(true);
        };

        const listener = eventEmitter.addListener('confirm', onConfirm);

        return () => listener.remove();
    });

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{data.title}</DialogTitle>
            <DialogContent sx={{ width: 400 }}>{data.content}</DialogContent>
            <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                    Huỷ
                </Button>
                <Button onClick={handleOk}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
