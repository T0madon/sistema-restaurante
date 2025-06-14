import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function CompletedOrders() {
    const [completedOrders, setCompletedOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompletedOrders = async () => {
            try {
                const response = await api.get(
                    "/orders?status=Concluído&_sort=completedAt&_order=desc"
                );
                setCompletedOrders(response.data);
            } catch (error) {
                console.error("Erro ao buscar pedidos concluídos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompletedOrders();
    }, []);

    if (loading) {
        return <p>Carregando pedidos...</p>;
    }

    return (
        <div className="completed-orders-container">
            <h1>Pedidos Concluídos</h1>
            {completedOrders.length === 0 ? (
                <p>Ainda não há pedidos concluídos.</p>
            ) : (
                <ul className="completed-list">
                    {completedOrders.map((order) => (
                        <li key={order.id}>
                            <span>
                                Pedido #{order.id} - {order.customerName}
                            </span>
                            <span>
                                Concluído em:{" "}
                                {new Date(order.completedAt).toLocaleString(
                                    "pt-BR"
                                )}
                            </span>
                            <Link
                                to={`/pedidos/${order.id}`}
                                className="details-button"
                            >
                                Ver Detalhes
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CompletedOrders;
