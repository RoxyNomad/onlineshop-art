"use client";

import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem
} from "chart.js";
import { Order } from "@/server/shared/types/order.types";
import styles from "@/src/styles/components/ordersTable.module.scss";

// Register necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersChart: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch orders from your API route
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders"); // GET orders from api/orders/route.ts
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const chartData = {
    labels: orders.map((order) => `Order ${order.id}`),
    datasets: [
      {
        label: "Betrag (CHF)",
        data: orders.map((order) => order.amount),
        backgroundColor: "#000000",
        borderColor: "#000000",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Bestellungen Betrag (CHF)",
        color: "#000000",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"bar">) {
            return `${tooltipItem.raw} CHF`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.ordersChartContainer}>
      <h2 className={styles.mainTitle}>Bestellungen</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.chartContainer}>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default OrdersChart;
