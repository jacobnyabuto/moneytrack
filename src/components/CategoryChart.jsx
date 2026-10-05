import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { CHART_COLORS } from '../data/chartColors'

// Register only the pieces a doughnut chart needs
ChartJS.register(ArcElement, Tooltip, Legend)

function CategoryChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.total),
        backgroundColor: data.map((_, index) => CHART_COLORS[index % CHART_COLORS.length]),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue('--bs-body-color')
            .trim(),
        },
      },
    },
  }

  return <Doughnut data={chartData} options={options} />
}

export default CategoryChart