import React, { useState } from 'react';

const chartDataSchema = null;

export function ViewerChartWrapper(props) {
  const { children } = props;
  const [ chartData, setChartData ] = useState(chartDataSchema);

  const childrenWithAddedProps = React.Children.map(children, child => {
    return React.cloneElement(child, { chartData, setChartData });
  });

  return (
    <> {childrenWithAddedProps}</>
  );
}