import { Component, createRef } from 'react';
import Chart from 'chart.js/auto';
import Box from '@mui/material/Box';

export class ConcentrationChart extends Component {
  constructor(props) {
    super(props);
    this.initializeChart = this.initializeChart.bind(this);
  }

  componentDidMount() {
    let chartCanvas = this.chartCanvas;
    this.initializeChart(chartCanvas);
  }

  initializeChart (chartDOMRef) {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
    // return
    const chart = new Chart(chartDOMRef, {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    });
  }

  render() {
    return (
      <Box sx={{height: "30em"}}>
          <div id="chart-container" className='fullSize'>
            <canvas
              className='chart-canvas fullWidth'
              ref={chartCanvas => (this.chartCanvas = chartCanvas)}
            />
          </div>
      </Box>
    );
  }
}