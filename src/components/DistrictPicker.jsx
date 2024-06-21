import { forwardRef, useMemo, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import useSWR from 'swr';
import { fetcher } from '~/config/api';

const DistrictPicker = forwardRef(
    (
        {
            city,
            onChange,
            onBlur,
            error,
            helperText,
            name,
            label = 'Quận / huyện',
            fullWidth = false,
            defaultValue = null,
        },
        ref,
    ) => {
        const { data } = useSWR(`/address/districts?sort=name&parent_code=${city}`, fetcher, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        });

        const [value, setValue] = useState(defaultValue);
        const selectedValue = useMemo(() => {
            const result = data?.find((district) => district.code === value);
            return result || null;
        }, [data, value]);

        const handleChange = (event, newValue) => {
            setValue(newValue?.code || '');
            if (onChange) {
                const mockEvent = {
                    ...event,
                    target: {
                        ...event.target,
                        name: name,
                        value: newValue?.code || '',
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
                        value: selectedValue?.code || '',
                    },
                };
                onBlur(mockEvent);
            }
        };

        return (
            <Autocomplete
                disablePortal
                id="city-picker"
                options={data || []}
                fullWidth={fullWidth}
                value={selectedValue}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={ref}
                getOptionKey={(city) => city._id}
                getOptionLabel={(city) => city.name_with_type}
                isOptionEqualToValue={(city, value) => city.code === value.code}
                renderInput={(params) => <TextField {...params} label={label} error={error} helperText={helperText} />}
            />
        );
    },
);

export default DistrictPicker;
