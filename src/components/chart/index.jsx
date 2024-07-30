import { Component } from 'react';
import Chart from 'chart.js/auto';
import Box from '@mui/material/Box';
import { plugin, options } from './helper';
import { connect } from 'react-redux';
import { chartData as premadeChartData } from '../../assets/data/chart_data';

export class ConcentrationChart1 extends Component {
  constructor(props) {
    super(props);
    this.initializeChart = this.initializeChart.bind(this);
    this.chart = null;
    this.state = {
      chartData: [ this.props.chartData ]
    }
  }

  componentDidMount() {
    let { chartMechanism } = this.props;
    this.handleChartCreate(chartMechanism);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // when new props is received, update the chart.
    if ( prevProps.chartMechanism === this.props.chartMechanism ) {
      let { chartMechanism } = this.props;
      this.handleChartChange(chartMechanism);  
    } else {
      let { chartMechanism } = this.props;
      this.chart.resetZoom();
      this.chart.destroy();
      this.handleChartCreate(chartMechanism);
    }

    if (this.props.reload && this.chart) {
      this.chart.resetZoom();
    }
  }

  initializeChart (chartDOMRef, chartData) {
    // initially during component did mount, add the chart data.
    let datetime = [];
    let value = [];
    let altitude = [];

    if (chartData) {
      datetime = chartData.datetime;
      value = chartData.value;
      altitude = chartData.altitude;
    }

    let dataset = {
      labels: datetime,
      datasets: [
        {
          label: 'CO2 Concentration (ppm)', // legend
          backgroundColor: "#ff6384",
          borderColor: "#ff6384",
          data: value,
          yAxisID: 'y1',
          showLine: false
        },
        {
          label: 'Altitude (m)', // legend
          data: altitude,
          borderColor: "#36a2eb",
          backgroundColor: "#36a2eb",
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

  handleChartCreate = (chartMechanism) => {
    let chartCanvas = this.chartCanvas;
    if (chartMechanism === "preloaded") {
      // then load the chart with the preloaded data. Later, only update the datetime.
      this.initializeChart(chartCanvas, premadeChartData);
    } else if (chartMechanism === "interpolated") {
      let { value, altitude, datetime } = this.props;
      let existingChartData = null;
      if (value && value.length > 0) {
        existingChartData = { value: [...value], altitude: [...altitude], datetime: [...datetime] };
      }
      this.initializeChart(chartCanvas, existingChartData);
    }
  };

  handleChartChange = (chartMechanism) => {
    if (chartMechanism === "preloaded") {
      // then load the chart with the preloaded data. Later, only update the datetime.
      this.changeReferenceLine(this.props.currentDateTime);
    } else if (chartMechanism === "interpolated") {
      // do not load anything on the chart. Later update the chart along with datetime.
      this.changeDataAndReferenceLine(this.props.currentDateTime, this.props.currentValue, this.props.currentAltitude);
    }
  };

  changeReferenceLine(datetime) {
    if (this.chart && datetime ) {
      const dataReferenceLine = this.chart.options.plugins.annotation.annotations.dataReferenceLine;
      dataReferenceLine.xMin = datetime;
      dataReferenceLine.xMax = datetime;
      // update the chart
      this.chart.update('none');
    }
  }

  changeDataAndReferenceLine(datetime, concentration, altitude) {
    if (this.chart && datetime && concentration && altitude) {
      // update that value in the chart.
      this.chart.data.labels.push(datetime);
      this.chart.data.datasets[0].data.push(concentration);
      this.chart.data.datasets[1].data.push(altitude);

      this.changeReferenceLine(datetime);
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
  currentDateTime: state.flight.currentDateTime,
  value: state.flight.value,
  altitude: state.flight.altitude,
  datetime: state.flight.datetime
});

export const ConcentrationChart = connect(mapStateToProps)(ConcentrationChart1);