import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TooltipItem } from "chart.js";
import { Order } from "@/domain/order/entities/order.entity";
import { fetchOrders } from "@/domain/order/queries/fetchOrders.query";
import styles from "@/styles/components/ordersTable.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersChart: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  const chartData = {
    labels: orders.map((o) => `Order ${o.id}`),
    datasets: [
      {
        label: "Betrag (CHF)",
        data: orders.map((o) => o.amount),
        backgroundColor: "#000000",
        borderColor: "#000000",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Bestellungen Betrag (CHF)", color: "#000000" },
      tooltip: {
        callbacks: { label: (tooltipItem: TooltipItem<"bar">) => `${tooltipItem.raw} CHF` },
      },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className={styles.ordersChartContainer}>
      <h2 className={styles.mainTitle}>Bestellungen</h2>
      {loading ? <p>Loading...</p> : <Bar data={chartData} options={options} />}
    </div>
  );
};

export default OrdersChart;