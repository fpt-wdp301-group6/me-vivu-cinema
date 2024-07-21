import { forwardRef, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import useSWR from 'swr';
import { fetcher } from '~/config/api';

const TheaterPicker = forwardRef(
    (
        {
            value,
            onChange,
            onBlur,
            error,
            helperText,
            name,
            label = 'Lựa chọn rạp chiếu',
            fullWidth = false,
            defaultValue = '',
        },
        ref,
    ) => {
        const { data: theaters } = useSWR('/theaters/all', fetcher);
        const selectedValue = useMemo(() => {
            const result = theaters?.data?.find((theater) => theater._id === value || defaultValue);
            return result || null;
        }, [theaters?.data, value, defaultValue]);

        const handleChange = (event, newValue) => {
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
                options={theaters?.data || []}
                fullWidth={fullWidth}
                value={value && selectedValue}
                defaultChecked={selectedValue}
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

export default TheaterPicker;
