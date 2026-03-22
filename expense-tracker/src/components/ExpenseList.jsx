export default function ExpenseList({ expenses, deleteExpense }) {
  if (expenses.length === 0) {
    return <p className="empty">No expenses yet 🚀</p>;
  }

  return (
    <div>
      {expenses.map((e) => (
        <div key={e.id} className="expense-item">
          <div className="expense-details">
            <h4>{e.name}</h4>
            <span className="category">{e.category}</span>
            <span className="amount">₹{e.amount}</span>
          </div>
          <button onClick={() => deleteExpense(e.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}