import { Component, createRef } from 'react';
import Chart from 'chart.js/auto';
import Box from '@mui/material/Box';
import { plugin, options } from './helper';

export class ConcentrationChart extends Component {
  constructor(props) {
    super(props);
    this.initializeChart = this.initializeChart.bind(this);
    this.update = this.updateChart.bind(this);
    this.chart = null;
    this.state = {
      chartData: [ this.props.chartData ]
    }
  }

  componentDidMount() {
    let chartCanvas = this.chartCanvas;
    this.initializeChart(chartCanvas);
  }

  componentDidUpdate(prevProps, prevState) {
    // when new props is received, update the chart.
    let { year, count } = this.props.chartData;
    this.updateChart(year, count);
  }

  initializeChart (chartDOMRef) {
    const data = this.state.chartData;
    const dataset = {
      labels: data.map(row => row.year),
      datasets: [
        {
          label: 'GHGC Concentration PPM',
          data: data.map(row => row.count)
        }
      ]
    };


    this.chart = new Chart(chartDOMRef, {
      type: 'line',
      data: dataset,
      options: options,
      plugins: [plugin]
    });
  }

  updateChart(label, data) {
    if (this.chart) {
      // update that value in the chart.
      this.chart.data.labels.push(label);
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
      });
      // update the chart
      this.chart.update();
    }
  }

  render() {
    return (
      <Box sx={{height: "30em"}}>
          <div id="chart-container" className='fullSize'>
            <canvas
              id = "chart"
              className='fullWidth'
              style={{width: "100%", height: "100%"}}
              ref={chartCanvas => (this.chartCanvas = chartCanvas)}
            />
          </div>
      </Box>
    );
  }
}