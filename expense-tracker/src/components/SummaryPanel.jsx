export default function SummaryPanel({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categories = {};
  expenses.forEach((e) => {
    categories[e.category] = (categories[e.category] || 0) + e.amount;
  });

  return (
    <div className="card">
      <h3>Total: ₹{total}</h3>

      <h4>Breakdown</h4>
      {Object.entries(categories).map(([cat, amt]) => (
        <p key={cat}>
          {cat === 'Food' ? '🍔' : cat === 'Travel' ? '✈️' : cat === 'Marketing' ? '📈' : cat === 'Utilities' ? '💡' : '❓'} {cat}: ₹{amt}
        </p>
      ))}
    </div>
  );
}