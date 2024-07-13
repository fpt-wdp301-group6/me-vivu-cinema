import { Paper } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { Table } from '~/components';
import api from '~/config/api';
import { constants } from '~/utils';

const TheaterFoodForm = ({ columns, theater, reloadTable }) => {
    const handleAdd = (event, item) => {
        const caller = () => {
            api.post(`/foods/${theater}`, { food: item._id })
                .then((res) => {
                    toast.success(res.message);
                    reloadTable(true);
                })
                .catch((err) => toast.error(err.data?.message || constants.sthWentWrong));
        };
        caller();
    };

    return (
        <div className="flex items-center justify-center w-full h-full pointer-events-none">
            <Paper className="p-5 pointer-events-auto min-w-96">
                <h3 className="mb-6 text-xl font-semibold">Thêm bắp nước vào rạp</h3>
                <div className="overflow-auto h-[500px]">
                    <Table columns={columns} url="/foods" onEdit={handleAdd} />
                </div>
            </Paper>
        </div>
    );
};

export default TheaterFoodForm;
