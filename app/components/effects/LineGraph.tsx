// components/LineGraph.tsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: '1', score: 40 },
  { name: '2', score: 60 },
  { name: '3', score: 75 },
  { name: '4', score: 50 },
  { name: '5', score: 90 }
];

const LineGraph = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: 'Total Tests Attempted', position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
