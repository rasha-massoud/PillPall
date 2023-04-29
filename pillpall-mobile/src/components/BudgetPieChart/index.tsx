import React, { FC } from 'react';
import { PieChart } from 'react-native-svg-charts';

interface BidgetPieChartProps {
  data: { [month: string]: number };
}

const BidgetPieChart: FC<BidgetPieChartProps> = (props) => {

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const months = [
    currentMonth,
    new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'long' }),
    new Date(Date.now() - 62 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'long' }),
  ];

  const values = months.map(month => props.data[month] || 0);

  const dataWithColor = values.map((value, index) => ({
    key: months[index],
    value,
    svg: { fill: colors[index] },
  }));

  return (
    <PieChart
      style={{ height: 300, marginVertical: 10 }}
      data={dataWithColor}
      innerRadius={60}
      outerRadius={100}
      labelRadius={120}
    />
  );
};

export default BidgetPieChart;

const colors = ['#f44336', '#2196f3', '#ffeb3b'];
