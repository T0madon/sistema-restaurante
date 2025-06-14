import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get(`/orders/${orderId}`);
                setOrder(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do pedido:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <p>Carregando detalhes do pedido...</p>;
    if (!order) return <p>Pedido não encontrado.</p>;

    const fullAddress =
        `${order.address.street}, ${order.address.number}` +
        `${order.address.complement ? ` - ${order.address.complement}` : ""}` +
        `\n${order.address.neighborhood} - ${order.address.city}/${order.address.state}`;

    return (
        <div className="order-details-container">
            <h1>Detalhes do Pedido #{order.id}</h1>
            <div className="order-details-card">
                <h3>Informações do Cliente</h3>
                <p>
                    <strong>Nome:</strong> {order.customerName}
                </p>
                <p>
                    <strong>Telefone:</strong> {order.phone}
                </p>
                <p style={{ whiteSpace: "pre-wrap" }}>
                    <strong>Endereço:</strong> {fullAddress}
                </p>{" "}
                <p>
                    <strong>Status do Pedido:</strong>{" "}
                    <span className={`status-${order.status.toLowerCase()}`}>
                        {order.status}
                    </span>
                </p>{" "}
                {order.completedAt && (
                    <p>
                        <strong>Finalizado em:</strong>{" "}
                        {new Date(order.completedAt).toLocaleString("pt-BR")}
                    </p>
                )}
            </div>
            <div className="order-details-card">
                <h3>Itens do Pedido</h3>
                <ul>
                    {order.items.map((item) => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                            <span>
                                {item.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </span>
                        </li>
                    ))}
                </ul>
                <hr />
                <p className="total-price">
                    <strong>Total do Pedido:</strong>
                    <span>
                        {order.total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </span>
                </p>
            </div>
            <Link to="/pedidos" className="back-button">
                Voltar
            </Link>
        </div>
    );
}

export default OrderDetails;
