import React, { useState, useEffect } from "react";
import DishForm from "./components/DishForm";
import DishList from "./components/DishList";
import api from "./services/api";

function App() {
    const [dishes, setDishes] = useState([]);

    const fetchDishes = async () => {
        try {
            const response = await api.get("/dishes");
            setDishes(response.data);
        } catch (error) {
            console.error("Erro ao buscar pratos:", error);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    const handleAddDish = async (newDish) => {
        try {
            await api.post("/dishes", newDish);
            fetchDishes();
        } catch (error) {
            console.error("Erro ao adicionar prato:", error);
        }
    };

    return (
        <div className="App">
            <header>
                <h1>Gerenciamento do Cardápio</h1>
            </header>
            <main>
                <DishForm onAddDish={handleAddDish} />
                <DishList dishes={dishes} />
            </main>
        </div>
    );
}

export default App;
