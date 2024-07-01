import { forwardRef, useMemo, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import useSWR from 'swr';
import { fetcher } from '~/config/api';

const RoomPicker = forwardRef(
    (
        {
            theater,
            onChange,
            onBlur,
            error,
            helperText,
            name,
            label = 'Lựa chọn phòng chiếu',
            fullWidth = false,
            defaultValue = null,
        },
        ref,
    ) => {
        const { data: rooms } = useSWR(`/rooms/${theater}`, fetcher, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        });
        const [value, setValue] = useState(defaultValue);
        const selectedValue = useMemo(() => {
            const result = rooms?.data?.find((room) => room._id === value);
            return result || null;
        }, [rooms?.data, value]);

        const handleChange = (event, newValue) => {
            setValue(newValue?._id || '');
            if (onChange) {
                const mockEvent = {
                    ...event,
                    target: {
                        ...event.target,
                        name: name,
                        value: newValue?._id || '',
                    },
                };
                onChange(mockEvent);
            }
        };

        const handleBlur = (event) => {
            if (onBlur) {
                const mockEvent = {
                    ...event,
                    target: {
                        ...event.target,
                        name: name,
                        value: selectedValue?._id || '',
                    },
                };
                onBlur(mockEvent);
            }
        };

        return (
            <Autocomplete
                disablePortal
                id="theater-picker"
                options={rooms?.data || []}
                fullWidth={fullWidth}
                value={selectedValue}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={ref}
                getOptionKey={(theater) => theater._id}
                getOptionLabel={(theater) => theater.name}
                isOptionEqualToValue={(theater, value) => theater._id === value._id}
                renderInput={(params) => <TextField {...params} label={label} error={error} helperText={helperText} />}
            />
        );
    },
);

export default RoomPicker;
