import { useEffect, useState } from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const TableHeader = ({ columns = [], onSortClick, orderBy = 'test' }) => {
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
            </TableRow>
        </TableHead>
    );
};

const Table = ({ columns, items = [], searchable, buttons = [], onLoadData }) => {
    const hasHeader = searchable || buttons?.length > 0;
    const [rows, setRows] = useState(items);

    useEffect(() => {
        onLoadData()
            .then((res) => setRows(res.data.data))
            .catch((err) => console.log(err));
    }, []);

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
                    <TableHeader columns={columns} />
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex}>{row[col.id]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
        </Paper>
    );
};

export default Table;
