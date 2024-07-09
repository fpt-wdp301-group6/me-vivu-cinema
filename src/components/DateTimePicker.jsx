import { forwardRef } from 'react';
import { FormControl, FormHelperText } from '@mui/material';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';

const DateTimePicker = forwardRef(({ error, helperText, name, onChange, onBlur, fullWidth, defaultValue }, ref) => {
    const handleChange = (value) => {
        if (onChange) {
            const event = new Event('change');
            const mockEvent = {
                ...event,
                target: {
                    ...event.target,
                    name: name,
                    value: value.toDate(),
                },
            };
            onChange(mockEvent);
        }
    };
    return (
        <FormControl error={error} fullWidth={fullWidth}>
            <MuiDateTimePicker
                className="w-full"
                name={name}
                defaultValue={moment(defaultValue)}
                onChange={handleChange}
                ref={ref}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
});

export default DateTimePicker;
