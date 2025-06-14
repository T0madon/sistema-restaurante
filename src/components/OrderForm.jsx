import React, { useState } from "react";

function OrderForm({ menuDishes, onAddOrder }) {
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState({
        street: "",
        neighborhood: "",
        city: "",
        state: "",
    });
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [dishIdToAdd, setDishIdToAdd] = useState("");

    const handleCepBlur = async (event) => {
        const enteredCep = event.target.value.replace(/\D/g, "");
        if (enteredCep.length !== 8) return;

        try {
            const response = await fetch(
                `https://viacep.com.br/ws/${enteredCep}/json/`
            );
            const data = await response.json();
            if (!data.erro) {
                setAddress({
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf,
                });
            } else {
                alert("CEP não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            alert("Não foi possível buscar o CEP.");
        }
    };

    const handleAddDishToOrder = () => {
        if (!dishIdToAdd) return;
        const dish = menuDishes.find((d) => d.id === dishIdToAdd);
        if (dish && !selectedDishes.find((d) => d.id === dish.id)) {
            setSelectedDishes([...selectedDishes, dish]);
        }
        setDishIdToAdd("");
    };

    const calculateTotal = () => {
        return selectedDishes.reduce((total, dish) => total + dish.price, 0);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!customerName || !number || selectedDishes.length === 0) {
            alert(
                "Preencha o nome, número do endereço e adicione pelo menos um prato."
            );
            return;
        }

        const newOrder = {
            customerName,
            phone,
            address: {
                ...address,
                cep: cep,
                number: number,
                complement: complement,
            },
            items: selectedDishes,
            total: calculateTotal(),
            createdAt: new Date().toISOString(),
            status: "Recebido",
            completedAt: null,
        };

        onAddOrder(newOrder);

        setCustomerName("");
        setPhone("");
        setCep("");
        setAddress({ street: "", neighborhood: "", city: "", state: "" });
        setNumber("");
        setComplement("");
        setSelectedDishes([]);
    };

    return (
        <form className="order-form-container" onSubmit={handleSubmit}>
            <h3>Novo Pedido</h3>
            <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nome do Cliente"
                required
            />
            <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefone"
            />
            <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={handleCepBlur}
                placeholder="CEP"
            />
            <input
                type="text"
                value={address.street}
                onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                }
                placeholder="Rua"
            />
            <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Número"
                required
            />{" "}
            <input
                type="text"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                placeholder="Complemento (opcional)"
            />{" "}
            <input
                type="text"
                value={address.neighborhood}
                onChange={(e) =>
                    setAddress({ ...address, neighborhood: e.target.value })
                }
                placeholder="Bairro"
            />
            <input
                type="text"
                value={address.city}
                onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                }
                placeholder="Cidade"
            />
            <input
                type="text"
                value={address.state}
                onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                }
                placeholder="Estado"
            />
            <h4>Adicionar Pratos</h4>
            <div className="add-dish-section">
                <select
                    value={dishIdToAdd}
                    onChange={(e) => setDishIdToAdd(e.target.value)}
                >
                    <option value="">Selecione um prato...</option>
                    {menuDishes.map((dish) => (
                        <option key={dish.id} value={dish.id}>
                            {dish.name} -{" "}
                            {dish.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={handleAddDishToOrder}>
                    Adicionar
                </button>
            </div>
            <h4>Pratos no Pedido</h4>
            <ul>
                {selectedDishes.map((dish) => (
                    <li key={dish.id}>{dish.name}</li>
                ))}
            </ul>
            <strong>
                Total:{" "}
                {calculateTotal().toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </strong>
            <button type="submit">Finalizar Pedido</button>
        </form>
    );
}

export default OrderForm;
