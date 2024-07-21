import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Container } from '@mui/material';
import { format } from '~/utils';

const pieParams = { height: 200, margin: { right: 5 } };
const palette = ['red', 'blue', 'green'];

const Dashboard = () => {
    return (
        <Container className="py-8">
            <h1 className="mb-4 text-3xl font-bold py-1 border-b-2 border-red-500 max-w-72">Quản lý & Phân tích</h1>
            <Stack
                className="bg-white py-6 flex text-center"
                direction="row"
                width="100%"
                textAlign="center"
                spacing={2}
            >
                <Box flexGrow={1}>
                    <Typography>Default</Typography>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        {...pieParams}
                    />
                </Box>
                <Stack flexGrow={1}>
                    <Typography>Palette</Typography>
                    <PieChart
                        colors={palette}
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        {...pieParams}
                    />
                </Stack>
            </Stack>
            <Stack className="overflow-auto">
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
        </Container>
    );
};

export default Dashboard;
