import { forwardRef, useEffect, useState } from 'react';
import { Autocomplete, ListItemAvatar, ListItemText, MenuItem, TextField } from '@mui/material';
import { useDebounce } from '~/hooks';
import useSWR from 'swr';
import tmdb, { fetcher } from '~/config/tmdb';
import { constants } from '~/utils';

const MoviePicker = forwardRef(
    (
        { onChange, onBlur, error, helperText, name, label = 'Chọn phim chiếu', fullWidth = false, defaultValue },
        ref,
    ) => {
        const [search, setSearch] = useState();
        const searchContent = useDebounce(search, 300);
        const [selectedValue, setSelectedValue] = useState(null);

        const url =
            selectedValue || searchContent
                ? `/search/movie?query=${searchContent || selectedValue.title}&region=VN`
                : `/movie/now_playing`;
        const { data, isLoading } = useSWR(url, fetcher, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        });

        useEffect(() => {
            const fetchMovie = async () => {
                try {
                    const res = await tmdb.get(`/movie/${defaultValue}`);
                    const movie = res.data;
                    setSelectedValue(movie || null);
                } catch {
                    setSelectedValue(null);
                }
            };

            if (defaultValue) fetchMovie();
        }, [defaultValue]);

        const handleSearch = (e) => {
            setSearch(e.target.value);
        };

        const handleChange = (event, newValue) => {
            setSelectedValue(newValue);
            if (onChange) {
                const mockEvent = {
                    ...event,
                    target: {
                        ...event.target,
                        name: name,
                        value: newValue?.id || '',
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
                        value: selectedValue?.id || '',
                    },
                };
                onBlur(mockEvent);
            }
        };

        return (
            <Autocomplete
                disablePortal
                id="movie-picker"
                options={data?.results || []}
                fullWidth={fullWidth}
                value={selectedValue}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={ref}
                getOptionKey={(movie) => movie.id}
                getOptionLabel={(movie) => movie.title || ''}
                isOptionEqualToValue={(movie, value) => movie.id === value.id}
                loading={isLoading}
                disableClearable
                onClose={() => setSearch('')}
                renderOption={(props, option) => {
                    const { key, ...others } = props;

                    return (
                        <MenuItem key={key} {...others}>
                            <ListItemAvatar>
                                <img
                                    src={`${constants.tmdbUrl}/w220_and_h330_face/${option.poster_path}`}
                                    alt={option.title}
                                    className="w-12 rounded-lg aspect-poster"
                                />
                            </ListItemAvatar>
                            <ListItemText>{option.title}</ListItemText>
                        </MenuItem>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onChange={handleSearch}
                        label={label}
                        error={error}
                        helperText={helperText}
                    />
                )}
            />
        );
    },
);

export default MoviePicker;
