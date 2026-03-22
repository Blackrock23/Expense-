export default function ExpenseList({ expenses, deleteExpense }) {
  if (expenses.length === 0) {
    return <p className="empty">No expenses yet 🚀</p>;
  }

  return (
    <div>
      {expenses.map((e) => (
        <div key={e.id} className="card">
          <h3>{e.name}</h3>
          <p>{e.category}</p>
          <p>₹{e.amount}</p>
          <button onClick={() => deleteExpense(e.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}