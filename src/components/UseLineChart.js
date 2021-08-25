import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [
    {name: 'Jan', uv: 6,},
    {name: 'Feb', uv: 3,},
    {name: 'Mar', uv: 1,},
    {name: 'May', uv: 4,},
    {name: 'Jun', uv: 7,},
    {name: 'Jul', uv: 5,},
    {name: 'Aug', uv: 9,},
    {name: 'Sep', uv: 8,},
    {name: 'Oct', uv: 1,},
    {name: 'Nov', uv: 6,},
    {name: 'Dec', uv: 2},
];

const UseLineChart = () => {
    return (
        <LineChart width={900} height={500} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
};

export default UseLineChart;