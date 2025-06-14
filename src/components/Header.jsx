import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="main-header">
            <div className="logo">Restaurante Sabor Divino</div>
            <nav>
                <NavLink to="/">Gerenciar Cardápio</NavLink>
                <NavLink to="/pedidos">Gerenciar Pedidos</NavLink>
                <NavLink to="/pedidos-concluidos">Pedidos Concluídos</NavLink>
            </nav>
        </header>
    );
}

export default Header;
