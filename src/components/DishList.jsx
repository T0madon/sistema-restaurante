import React from "react";

const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};

function DishList({ dishes }) {
    return (
        <div className="dish-list">
            <h2>Cardápio</h2>
            {dishes.length > 0 ? (
                <ul>
                    {dishes.map((dish) => (
                        <li key={dish.id}>
                            <div className="dish-info">
                                <strong>{dish.name}</strong> -{" "}
                                <span>({dish.category})</span>
                                <p>{dish.description}</p>
                            </div>
                            <div className="dish-price">
                                {formatPrice(dish.price)}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum prato cadastrado no cardápio.</p>
            )}
        </div>
    );
}

export default DishList;
