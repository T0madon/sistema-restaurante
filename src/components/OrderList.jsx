import React from "react";
import { Link } from "react-router-dom";

function OrderList({ orders, onCompleteOrder }) {
    return (
        <div className="order-list-container">
            <h3>Pedidos em Aberto</h3>
            {orders.length === 0 ? (
                <p>Nenhum pedido em aberto.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <div className="order-summary">
                                <strong>Pedido #{order.id}</strong>
                                <ul>
                                    {order.items.map((item) => (
                                        <li
                                            key={item.id}
                                            title={item.description}
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="order-actions">
                                {" "}
                                <Link
                                    to={`/pedidos/${order.id}`}
                                    className="details-button"
                                >
                                    Ver Detalhes
                                </Link>
                                <button
                                    onClick={() => onCompleteOrder(order.id)}
                                    className="complete-button"
                                >
                                    Concluir Pedido
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OrderList;
