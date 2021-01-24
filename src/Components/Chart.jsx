import {ResponsiveContainer, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";


export default function Chart({data, lines})
{
    //data format : { x: , y1: y2: , y3: }

        return (
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="y1" stroke="#ffffff" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#000000" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
