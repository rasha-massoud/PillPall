import React from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

type Props = {
  data: {
    [month: string]: number;
  };
};

const PieChartComponent: React.FC<Props> = (props) => {
  const chartData = Object.keys(props.data).map((month) => ({
    name: month,
    value: props.data[month],
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // generate random color
  }));

  return (
    <View>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={'value'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[10, 50]}
        absolute
      />
    </View>
  );
};

export default PieChartComponent;
