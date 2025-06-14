import React, { useState } from "react";

function DishForm({ onAddDish }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Prato Principal");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !description || !price) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        onAddDish({
            name,
            description,
            price: parseFloat(price),
            category,
        });

        setName("");
        setDescription("");
        setPrice("");
        setCategory("Prato Principal");
    };

    return (
        <div className="dish-form">
            <h2>Cadastrar Novo Prato</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome do Prato"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Preço (ex: 45.50)"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Prato Principal">Prato Principal</option>
                    <option value="Acompanhamento">Acompanhamento</option>
                    <option value="Bebida">Bebida</option>
                    <option value="Sobremesa">Sobremesa</option>
                </select>
                <button type="submit">Cadastrar Prato</button>
            </form>
        </div>
    );
}

export default DishForm;
