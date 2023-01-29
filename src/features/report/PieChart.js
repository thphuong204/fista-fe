import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { fNumber } from '../../utils/formatNumber';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    flexDirection: 'row !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

PieChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default function PieChart({ title, subheader, chartColors, chartData, ...other }) {

  const chartSeries = chartData.map((i) =>  i.value);

  const options = {
        chart: {
            selection: {
                enabled: true
            },
            type: "pie",
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                    height: "24px",
                    download: true,
                    selection: true,
                    pan: true,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    }
            },
        },
        labels: ['a','b','c','d'],
        legend: { 
            floating: true, 
            show: true,
            horizontalAlign: 'center',
        },
        dataLabels: { 
            enabled: true, 
            dropShadow: { enabled: false } 
        },
        tooltip: {
            fillSeriesColor: false,
            y: {
              formatter: (seriesName) => fNumber(seriesName),
              title: {
                formatter: (seriesName) => `${seriesName}`,
              },
            },
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } },
            dataLabels: {
                enabled: false,
                style: {
                    colors: ['#333']
                },
                offsetX: 30
            },
        },
        responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
        }]
  }

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper dir="ltr">
        <ReactApexChart 
            type="pie" 
            series={chartSeries} 
            options={options} 
            height={280} 
        />
      </StyledChartWrapper>
    </Card>
  );
}
