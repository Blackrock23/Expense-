import { useState } from "react";

export default function ExpenseForm({ addExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || amount <= 0) {
      setError("Please enter valid name and amount > 0");
      return;
    }

    setError("");
    addExpense({ name, amount: Number(amount), category });

    setName("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <div className="card">
      <h3>Add Expense</h3>
{error && <p style={{ color: "orange" }}>{error}</p>}

      <form onSubmit={handleSubmit}> 
        <input
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Utilities</option>
          <option>Marketing</option>
          <option>Other</option>
        </select>

        <button>Add</button>
      </form>
    </div>
  );
}