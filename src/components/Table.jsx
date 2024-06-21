import { useEffect, useMemo, useState } from 'react';
import {
    Button,
    InputAdornment,
    Paper,
    Table as MuiTable,
    TableHead,
    TextField,
    TableCell,
    TableContainer,
    TableRow,
    TableSortLabel,
    TableBody,
    TablePagination,
    IconButton,
    Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher as defaultFetcher } from '~/config/api';
import { useDebounce } from '~/hooks';

const TableHeader = ({ columns = [], onSortClick, orderBy = 'test', action }) => {
    const [order, setOrder] = useState();

    const handleSortClick = (id) => () => {
        switch (order) {
            case 'asc':
                setOrder('desc');
                onSortClick(`-${id}`);
                break;
            case 'desc':
                setOrder(undefined);
                onSortClick();
                break;
            default:
                setOrder('asc');
                onSortClick(id);
        }
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((column, index) => {
                    const { id, header, width, numeric, disablePadding, sortable } = column;

                    return (
                        <TableCell
                            key={id || index}
                            align={numeric ? 'right' : 'left'}
                            padding={disablePadding ? 'none' : 'normal'}
                            width={width}
                        >
                            {sortable ? (
                                <TableSortLabel
                                    onClick={handleSortClick}
                                    direction={order}
                                    active={order && orderBy === id}
                                >
                                    {header}
                                </TableSortLabel>
                            ) : (
                                header
                            )}
                        </TableCell>
                    );
                })}
                {action && <TableCell />}
            </TableRow>
        </TableHead>
    );
};

const Table = ({ columns, searchable, buttons = [], url, fetcher = defaultFetcher, onEdit, onDelete }) => {
    const hasHeader = searchable || buttons?.length > 0;
    const action = Boolean(onEdit || onDelete);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState();
    const searchContent = useDebounce(search, 500);
    const [options, setOptions] = useState({
        page: 1,
        limit: 10,
        search: search,
    });

    const queryUrl = useMemo(() => {
        const filteredParams = Object.fromEntries(Object.entries(options).filter(([key, value]) => !!value));
        const queryString = new URLSearchParams(filteredParams).toString();
        return `${url}?${queryString}`;
    }, [url, options]);
    const { data } = useSWR(queryUrl, fetcher);

    const handleChangeOptions = (key, value) => {
        setOptions((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSort = (sort) => {
        handleChangeOptions('sort', sort);
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        if (!value.startsWith(' ')) {
            setSearch(value);
        }
    };
    useEffect(() => {
        handleChangeOptions('search', searchContent);
    }, [searchContent]);

    useEffect(() => {
        if (data) {
            setTotal(data.total);
        }
    }, [data]);

    return (
        <Paper variant="outlined">
            {hasHeader && (
                <div className="flex items-center justify-between p-4 border-b">
                    <div>
                        {searchable && (
                            <TextField
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Tìm kiếm..."
                                value={search}
                                onChange={handleSearch}
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        {buttons?.map((button, index) => (
                            <Button key={index} component={button.href && Link} to={button.href || '#'} {...button}>
                                {button.text}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            <TableContainer>
                <MuiTable>
                    <TableHeader columns={columns} onSortClick={handleSort} action={action} />
                    <TableBody>
                        {data?.data.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex}>{col.valueGetter?.(row) || row[col.id]}</TableCell>
                                ))}
                                {action && (
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {onEdit && (
                                                <Tooltip title="Sửa">
                                                    <IconButton size="small" onClick={(event) => onEdit(event, row)}>
                                                        <EditOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            {onDelete && (
                                                <Tooltip title="Xoá">
                                                    <IconButton
                                                        size="small"
                                                        onClick={(event) => onDelete(event, row)}
                                                        color="error"
                                                    >
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[1, 5, 10, 20]}
                component="div"
                count={total}
                rowsPerPage={options.limit}
                page={options.page - 1}
                onPageChange={(_, value) => handleChangeOptions('page', value + 1)}
                onRowsPerPageChange={(event) => handleChangeOptions('limit', event.target.value)}
            />
        </Paper>
    );
};

export default Table;
