import { Component } from 'react';
import Chart from 'chart.js/auto';
import Box from '@mui/material/Box';
import { plugin, options } from './helper';
import { connect } from 'react-redux';

export class ConcentrationChart1 extends Component {
  constructor(props) {
    super(props);
    this.initializeChart = this.initializeChart.bind(this);
    this.update = this.addChartData.bind(this);
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
    this.addChartData(this.props.currentDateTime, this.props.currentValue, this.props.currentAltitude);
  }

  initializeChart (chartDOMRef) {
    let dataset = {
      labels: [],
      datasets: [
        {
          label: 'CO2 Concentration (ppm)', // legend
          pointBackgroundColor: "#ff6384",
          pointBorderColor: "#ff6384",
          data: [],
          yAxisID: 'y1',
          showLine: false
        },
        {
          label: 'Altitude (m)', // legend
          data: [],
          pointBorderColor: "#36a2eb",
          pointBackgroundColor: "#36a2eb",
          yAxisID: 'y2',
          showLine: false
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

  addChartData(datetime, concentration, altitude) {
    if (this.chart && datetime && concentration && altitude) {
      // update that value in the chart.
      this.chart.data.labels.push(datetime);
      this.chart.data.datasets[0].data.push(concentration);
      this.chart.data.datasets[1].data.push(altitude);

      const dataReferenceLine = this.chart.options.plugins.annotation.annotations.dataReferenceLine;
      dataReferenceLine.xMin = datetime;
      dataReferenceLine.xMax = datetime;
      // update the chart
      this.chart.update('none');
    }
  }

  render() {
    return (
      <Box sx={{height: "100%", width: "auto"}}>
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

const mapStateToProps = (state) => ({
  currentValue: state.flight.currentValue,
  currentAltitude: state.flight.currentAltitude,
  currentDateTime: state.flight.currentDateTime
});

export const ConcentrationChart = connect(mapStateToProps)(ConcentrationChart1);