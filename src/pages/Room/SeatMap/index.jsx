import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '~/config/api';
import { Button, IconButton, Switch, Tooltip } from '@mui/material';
import { emitter } from '~/utils';
import config from '~/config';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SeatType } from './constants';
import SeatSetting from './SeatSetting';
import Seat from './Seat';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';

const SeatMap = () => {
    const { roomId } = useParams();
    const [seats, setSeats] = useState(() => {
        return Array.from({ length: 12 }).map((arr) => Array.from({ length: 12 }));
    });
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const { data } = useSWR(`/rooms/${roomId}/seats`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    useEffect(() => {
        if (data) {
            const newSeats = [...seats];
            data.data.forEach((seat) => {
                newSeats[seat.y][seat.x] = seat;
                if (seat.type === SeatType.Couple) {
                    newSeats[seat.y][seat.x + 1] = {};
                }
            });
            setSeats(newSeats);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleCancel = () => {
        emitter.confirm('Huỷ chỉnh sửa', 'Bạn có chắc sẽ huỷ tiến trình này không? Những thay đổi sẽ mất', () => {
            navigate(config.routes.room.base);
        });
    };

    const handleDropSeat = useCallback(
        (x, y, item) => {
            const newSeats = [...seats];
            const { seat } = item;
            if (seat.type === SeatType.Couple) {
                if (Number.isInteger(item.x) && Number.isInteger(item.y)) {
                    newSeats[item.y][item.x] = undefined;
                    newSeats[item.y][item.x + 1] = undefined;
                }
                if (x === newSeats[y].length - 1) {
                    newSeats.forEach((row) => {
                        row.push(undefined);
                    });
                }
                newSeats[y][x + 1] = {};
            } else {
                if (Number.isInteger(item.x) && Number.isInteger(item.y)) {
                    newSeats[item.y][item.x] = undefined;
                }
            }
            newSeats[y][x] = seat;
            setSeats(newSeats);
        },
        [seats],
    );

    const addRow = (above = false) => {
        const newRow = Array.from({ length: seats[0].length });
        let newSeats = [...seats];
        if (above) {
            newSeats.unshift(newRow);
        } else {
            newSeats.push(newRow);
        }
        setSeats(newSeats);
    };

    const addColumns = (left = false) => {
        const newSeats = [...seats];
        newSeats.forEach((row) => {
            if (left) {
                row.unshift(undefined);
            } else {
                row.push(undefined);
            }
        });
        setSeats(newSeats);
    };

    const removeEmpty = () => {
        const newSeats = [...seats];
        while (newSeats[0].every((seat) => !seat)) {
            newSeats.shift();
        }
        while (newSeats[newSeats.length - 1].every((seat) => !seat)) {
            newSeats.pop();
        }
        while (newSeats.every((row) => !row[row.length - 1])) {
            newSeats.forEach((row) => row.pop());
        }
        while (newSeats.every((row) => !row[0])) {
            newSeats.forEach((row) => row.shift());
        }
        setSeats(newSeats);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ height: 'calc(100vh - 144px)' }}>
                <div className="relative flex h-full -m-4">
                    <SeatSetting seats={seats} onDropSeat={handleDropSeat} disabled={editMode} />
                    <div className="h-full p-4 bg-white border-l w-80">
                        <h2 className="flex items-center gap-2 mb-2 text-lg font-semibold">
                            Chế độ chỉnh sửa
                            <Switch
                                checked={editMode}
                                onChange={(e) => setEditMode(e.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </h2>
                        <div className="flex flex-wrap items-center gap-2">
                            <Tooltip title="Ghế thường">
                                <span>
                                    <IconButton disabled={!editMode} title="Ghế đơn">
                                        <Seat seat={{ type: SeatType.Normal }} />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title="Ghế VIP">
                                <span>
                                    <IconButton disabled={!editMode} title="Ghế VIP">
                                        <Seat seat={{ type: SeatType.VIP }} />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title="Ghế sweetbox">
                                <span>
                                    <IconButton disabled={!editMode}>
                                        <Seat seat={{ type: SeatType.Couple }} />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </div>
                        <div className="grid grid-cols-3 text-center">
                            <div className="col-start-2">
                                <Tooltip title="Thêm hàng bên trên">
                                    <span>
                                        <IconButton disabled={!editMode} onClick={() => addRow(true)}>
                                            <KeyboardArrowUpIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="row-start-2">
                                <Tooltip title="Thêm cột bên trái">
                                    <span>
                                        <IconButton disabled={!editMode} onClick={() => addColumns(true)}>
                                            <KeyboardArrowLeftIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="col-start-2 row-start-2">
                                <Tooltip title="Xoá tất cả cột hàng trống">
                                    <span>
                                        <IconButton disabled={!editMode} onClick={removeEmpty} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="col-start-3 row-start-2">
                                <Tooltip title="Thêm cột bên phải">
                                    <span>
                                        <IconButton disabled={!editMode} onClick={() => addColumns(false)}>
                                            <KeyboardArrowRightIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="col-start-2 row-start-3">
                                <Tooltip title="Thêm hàng bên dưới">
                                    <span>
                                        <IconButton disabled={!editMode} onClick={() => addRow(false)}>
                                            <KeyboardArrowDownIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-0 right-0 flex items-center justify-end h-20 gap-2 px-4 bg-white border-t top-full">
                        <Button size="large" variant="outlined" color="secondary" onClick={handleCancel}>
                            Huỷ
                        </Button>
                        <Button size="large">Lưu</Button>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default SeatMap;
