'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/ui/dashboard/customer/CustomerSiderbar";
import { Order } from "@/domain/order/entities/order.entity";
import { OrderRepository } from "@/infrastructure/repositories/order.repository.impl";
import { GetOrdersByUserQuery } from "@/domain/order/queries/getOrdersByUser.query";
import styles from "@/src/styles/customer/myOrders.module.scss";

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const repo = new OrderRepository();
  const query = new GetOrdersByUserQuery(repo);

  // Hier würde normalerweise die UserID aus dem Auth-Context / Token kommen
  const userId = "current-user-id";

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const data = await query.execute(userId);
      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, [userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Bestellt": return "text-blue-500";
      case "Verschickt": return "text-yellow-500";
      case "Zugestellt": return "text-green-500";
      default: return "";
    }
  };

  return (
    <div className={styles.myOrdersPage}>
      <Sidebar />
      <div className={styles.myOrdersContainer}>
        <div className={styles.myOrdersField}>
          <h1 className={styles.myOrdersTitle}>Meine Bestellungen</h1>
          {loading ? (
            <p>Lade Bestellungen...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Bestellnummer</th>
                  <th className="border p-2">Artikel</th>
                  <th className="border p-2">Bestellstatus</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="text-center">
                    <td className="border p-2">{order.id}</td>
                    <td className="border p-2">{order.name}</td>
                    <td className={`border p-2 ${getStatusColor(order.status)}`}>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
