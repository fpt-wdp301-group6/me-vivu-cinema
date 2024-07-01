import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { Button, Paper, TextField } from '@mui/material';

const SeatNamePopup = forwardRef(({ onSubmit }, refs) => {
    const [anchor, setAnchor] = useState();
    const [seat, setSeat] = useState();
    const formRef = useRef();
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setAnchor(null);
                setSeat(null);
            }
        };

        if (anchor) {
            setTimeout(() => {
                formRef.current?.focus();
                formRef.current?.select();
            }, 0);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [anchor]);

    useImperativeHandle(refs, () => ({
        open: (element, item) => {
            setAnchor(anchor === element ? null : element);
            setSeat(anchor === element ? null : item);
        },
    }));

    const handleChange = (e) => {
        setSeat({ ...seat, name: e.target.value.toUpperCase() });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        onSubmit(seat);
        setAnchor(null);
        setSeat(null);
    };

    return (
        <BasePopup open={!!anchor} anchor={anchor} ref={popupRef}>
            <Paper className="p-4">
                <div className="flex items-center gap-2">
                    <TextField
                        label="Số ghế"
                        value={seat?.name}
                        onChange={handleChange}
                        size="small"
                        inputRef={formRef}
                        onKeyDown={handleKeyDown}
                    />
                    <Button onClick={handleSubmit}>OK</Button>
                </div>
            </Paper>
        </BasePopup>
    );
});

export default SeatNamePopup;
