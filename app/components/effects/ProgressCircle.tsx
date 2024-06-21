'use client'

import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

interface NumberProps {
  percentage: number;
}

const ProgressCircle: React.FC<NumberProps> = ({ percentage }) => {
  const data = [
    {
      name: 'Progress',
      value: percentage,
      fill: '#82ca9d', // Color for the completed part
    },
    {
      name: 'Remaining',
      value: 100 - percentage,
      fill: '#d3d3d3', // Color for the remaining part
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <RadialBarChart
        width={150} // Reduced width
        height={150} // Reduced height
        cx="50%"
        cy="50%"
        innerRadius="60%" // Adjusted inner radius
        outerRadius="80%" // Adjusted outer radius
        barSize={8} // Reduced bar size
        data={data}
        startAngle={90}
        endAngle={-270} // Full circle clockwise
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
        //   minAngle={15}
          background
          dataKey="value"
          cornerRadius={10} // Rounded corners
        //   clockWise
        />
      </RadialBarChart>
    </div>
  );
};

export default ProgressCircle;
