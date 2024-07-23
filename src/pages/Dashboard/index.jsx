import { LineChart } from '@mui/x-charts/LineChart';
import { Container, Paper } from '@mui/material';
import StyleIcon from '@mui/icons-material/Style';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import useSWR from 'swr';
import { fetcher } from '~/config/api';
import { format } from '~/utils';

const Dashboard = () => {
    const { data: revenue } = useSWR(`/tickets/cinema/revenue-per-month`, fetcher);
    const { data: ticketCount } = useSWR('/tickets/cinema/count', fetcher);
    const { data: ticketTotal } = useSWR('/tickets/cinema/total', fetcher);
    const { data: showtimeCount } = useSWR('/showtimes/cinema/count', fetcher);

    return (
        <Container className="py-8">
            <h1 className="py-1 mb-4 text-3xl font-bold ">Quản lý & Phân tích</h1>
            <div className="flex gap-5 mb-10 mt-14">
                <Paper className="flex-1 p-4 rounded-3xl">
                    <div className="flex gap-12 pb-5 border-b-2 border-zinc-50">
                        <div className="relative flex-1 w-full h-full">
                            <div className="absolute flex items-center justify-center w-20 h-20 bg-black rounded-xl -top-10 ">
                                <StyleIcon className="text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col items-end flex-1">
                            <p className="text-zinc-400 text-md">Đơn Hàng</p>
                            <p className="text-2xl font-bold">{ticketCount?.data}</p>
                        </div>
                    </div>
                    <p className="mt-3 text-zinc-400">
                        <span className="font-bold text-red-500">+55%</span> so với tuần trước
                    </p>
                </Paper>
                <Paper className="flex-1 p-4 rounded-3xl">
                    <div className="flex gap-12 pb-5 border-b-2 border-zinc-50">
                        <div className="relative flex-1 w-full h-full">
                            <div className="absolute flex items-center justify-center w-20 h-20 bg-indigo-400 rounded-xl -top-10 ">
                                <PersonAddAltIcon className="text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col items-end flex-1">
                            <p className="text-zinc-400 text-md">Người Dùng</p>
                            <p className="text-2xl font-bold">6</p>
                        </div>
                    </div>
                    <p className="mt-3 text-zinc-400">
                        <span className="font-bold text-red-500">+3%</span> so với tuần trước
                    </p>
                </Paper>
                <Paper className="flex-1 p-4 rounded-3xl">
                    <div className="flex gap-12 pb-5 border-b-2 border-zinc-50">
                        <div className="relative flex-1 w-full h-full">
                            <div className="absolute flex items-center justify-center w-20 h-20 bg-green-600 rounded-xl -top-10 ">
                                <LocalAtmIcon className="text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col items-end flex-1">
                            <p className="text-zinc-400 text-md">Doanh Thu</p>
                            <p className="text-2xl font-bold">{format.price(ticketTotal?.data || 0)}</p>
                        </div>
                    </div>
                    <p className="mt-3 text-zinc-400">
                        <span className="font-bold text-red-500">+3%</span> so với hôm qua
                    </p>
                </Paper>
                <Paper className="flex-1 p-4 rounded-3xl">
                    <div className="flex gap-12 pb-5 border-b-2 border-zinc-50">
                        <div className="relative flex-1 w-full h-full">
                            <div className="absolute flex items-center justify-center w-20 h-20 bg-pink-600 rounded-xl -top-10 ">
                                <CalendarMonthIcon className="text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col items-end flex-1">
                            <p className="text-zinc-400 text-md">Lịch Chiếu</p>
                            <p className="text-2xl font-bold">{showtimeCount?.data}</p>
                        </div>
                    </div>
                    <p className="mt-3 text-zinc-400">
                        <span className="font-bold text-red-500">+3%</span> so với tuần trước
                    </p>
                </Paper>
            </div>
            <Paper className="mb-10">
                <LineChart
                    className="mx-auto"
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], tickMinStep: 1 }]}
                    yAxis={[{ valueFormatter: (data) => `${data / 1000}K` }]}
                    series={[
                        {
                            data: Array.from({ length: 12 })
                                .fill(0)
                                .map((_, index) => {
                                    const month = index + 1;
                                    const indexRevenue = revenue?.data.months.indexOf(month);
                                    return revenue?.data.revenues[indexRevenue] || 0;
                                }),
                        },
                    ]}
                    width={1100}
                    height={500}
                />
            </Paper>
        </Container>
    );
};

export default Dashboard;
