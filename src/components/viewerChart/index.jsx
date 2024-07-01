import React, { useState } from 'react';

const chartDataSchema = null;
const altidudeDataSchema = null;

export function ViewerChartWrapper(props) {
  const { children } = props;
  const [ chartData, setChartData ] = useState(chartDataSchema);
  const [ altitudeData, setAltitudeData ] = useState(altidudeDataSchema);

  const childrenWithAddedProps = React.Children.map(children, child => {
    return React.cloneElement(child, { chartData, setChartData, altitudeData, setAltitudeData });
  });

  return (
    <> {childrenWithAddedProps}</>
  );
}