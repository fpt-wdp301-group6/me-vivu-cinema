import React from 'react';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { Container, Paper } from '@mui/material';
import StyleIcon from '@mui/icons-material/Style';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useSWR from 'swr';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Dashboard = () => {
    const { data } = useSWR(`/tickets/revenue-per-month`);
    console.log(data);
    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold py-1 ">Quản lý & Phân tích</h1>
            <div className="flex gap-5 mt-14 mb-10">
                <Paper className="p-4 flex-1 rounded-3xl">
                    <div className="gap-12 flex pb-5 border-b-2 border-zinc-50">
                        <div className="flex-1 w-full h-full relative">
                            <div className="absolute flex items-center rounded-xl justify-center -top-10 bg-black w-20 h-20 ">
                                <StyleIcon className="text-white" />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                            <p className="text-zinc-400 text-md">Đơn Hàng</p>
                            <p className="font-bold text-2xl">281</p>
                        </div>
                    </div>
                    <p className="mt-3 text-zinc-400">
                        <span className="font-bold text-red-500">+55%</span> so với tuần trước
                    </p>
                </Paper>
                <Paper className="p-4 flex-1 rounded-3xl">
                    <div className="gap-12 flex pb-5 border-b-2 border-zinc-50">
                        <div className="flex-1 w-full h-full relative">
                            <div className="absolute flex items-center rounded-xl justify-center -top-10 bg-indigo-400 w-20 h-20 ">
                                <PersonAddAltIcon className="text-white" />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                            <p className="text-zinc-400 text-md">Người Dùng</p>
                            <p className="font-bold text-2xl">99</p>
                        </div>
                    </div>
                    <p className="mt-3 text-zinc-400">
                        <span className="font-bold text-red-500">+3%</span> so với tuần trước
                    </p>
                </Paper>
                <Paper className="p-4 flex-1 rounded-3xl">
                    <div className="gap-12 flex pb-5 border-b-2 border-zinc-50">
                        <div className="flex-1 w-full h-full relative">
                            <div className="absolute flex items-center rounded-xl justify-center -top-10 bg-green-600 w-20 h-20 ">
                                <LocalAtmIcon className="text-white" />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                            <p className="text-zinc-400 text-md">Doanh Thu</p>
                            <p className="font-bold text-2xl">8 triệu</p>
                        </div>
                    </div>
                    <p className="mt-3 text-zinc-400">
                        <span className="font-bold text-red-500">+3%</span> so với hôm qua
                    </p>
                </Paper>
                <Paper className="p-4 flex-1 rounded-3xl">
                    <div className="gap-12 flex pb-5 border-b-2 border-zinc-50">
                        <div className="flex-1 w-full h-full relative">
                            <div className="absolute flex items-center rounded-xl justify-center -top-10 bg-pink-600 w-20 h-20 ">
                                <CalendarMonthIcon className="text-white" />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                            <p className="text-zinc-400 text-md">Lịch Chiếu</p>
                            <p className="font-bold text-2xl">45</p>
                        </div>
                    </div>
                    <p className="mt-3 text-zinc-400">
                        <span className="font-bold text-red-500">+3%</span> so với tuần trước
                    </p>
                </Paper>
            </div>
            <Stack className="overflow-auto mb-10">
                <LineChart
                    className="bg-white mt-10"
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 10.5, 1.5, 5],
                        },
                    ]}
                    width={1200}
                    height={300}
                />
            </Stack>
            <div className="flex gap-10">
                <Paper className="flex-3 p-6">
                    <div className="flex items-center justify-between">
                        <p>
                            <strong className="text-xl "> Đơn hàng </strong>
                            <br />
                            <span className="flex items-center text-zinc-400">
                                <DoneIcon className="text-blue-700" />
                                <strong className="pr-1">30 Đơn</strong> đã giao trong tháng
                            </span>
                        </p>
                        <MoreVertIcon />
                    </div>
                    <TableContainer className="mt-6" component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Paper className="flex-1 p-6">Lịch chiếu mới</Paper>
            </div>
        </Container>
    );
};

export default Dashboard;
