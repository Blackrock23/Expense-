import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import CurrencyConverter from "./components/CurrencyConverter";
import ExpenseChart from "./components/ExpenseChart";
import SmartInsights from "./components/SmartInsights";
import { loadExpenses, saveExpenses } from "./utils/localstorage.js";
import "./styles.css";

function App() {
  const [expenses, setExpenses] = useState(loadExpenses());

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="app">
      <h1 className="title">💸 AI Expense Tracker</h1>

      <div className="grid">
        <div>
          <ExpenseForm addExpense={addExpense} />
          <CurrencyConverter expenses={expenses} />
        </div>

        <div>
          <SummaryPanel expenses={expenses} />
          <SmartInsights expenses={expenses} /> {/* 🔥 */}
          <ExpenseChart expenses={expenses} />
        </div>
      </div>

      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;
