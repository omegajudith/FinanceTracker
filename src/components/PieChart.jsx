import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ transactions }) => {
  const incomeTotal = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Income vs Expenses',
        data: [incomeTotal, expenseTotal],
        backgroundColor: ['#E12D2D', '#8F1E1E'], // Shades of maroon
        borderColor: ['#B82626', '#661616'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="bg-maroon-100 p-4 rounded shadow-md mt-4">
      <h2 className="text-lg font-bold text-maroon-700">Income vs Expenses</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

// Define PropTypes for the component
PieChart.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PieChart;
