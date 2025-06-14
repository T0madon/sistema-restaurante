import React, { useState, useEffect } from "react";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import api from "../services/api";

function ManageOrders() {
    const [menuDishes, setMenuDishes] = useState([]);
    const [orders, setOrders] = useState([]);

    const fetchData = async () => {
        try {
            const [dishesResponse, ordersResponse] = await Promise.all([
                api.get("/dishes"),
                api.get("/orders?status=Recebido&_sort=id&_order=asc"),
            ]);
            setMenuDishes(dishesResponse.data);
            setOrders(ordersResponse.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddOrder = async (newOrder) => {
        try {
            await api.post("/orders", newOrder);
            fetchData();
        } catch (error) {
            console.error("Erro ao adicionar pedido:", error);
        }
    };

    const handleCompleteOrder = async (orderId) => {
        try {
            await api.patch(`/orders/${orderId}`, {
                status: "Concluído",
                completedAt: new Date().toISOString(),
            });
            fetchData();
        } catch (error) {
            console.error("Erro ao concluir pedido:", error);
        }
    };

    return (
        <div>
            <h1>Gerenciamento de Pedidos</h1>
            <div className="manage-orders-layout">
                <OrderForm
                    menuDishes={menuDishes}
                    onAddOrder={handleAddOrder}
                />
                <OrderList
                    orders={orders}
                    onCompleteOrder={handleCompleteOrder}
                />
            </div>
        </div>
    );
}

export default ManageOrders;
