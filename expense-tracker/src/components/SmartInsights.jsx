// components/SmartInsights.jsx
export default function SmartInsights({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const food = expenses
    .filter(e => e.category === "Food")
    .reduce((sum, e) => sum + e.amount, 0);

  const travel = expenses
    .filter(e => e.category === "Travel")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="card">
      <h3>🤖 Smart Insights</h3>

      {total === 0 ? (
        <p>No insights yet</p>
      ) : (
        <>
          <p>🍔 Food: {((food / total) * 100).toFixed(1)}%</p>
          <p>✈️ Travel: {((travel / total) * 100).toFixed(1)}%</p>

          {food > total * 0.4 && (
            <p style={{ color: "orange" }}>
              ⚠️ High food spending detected
            </p>
          )}
        </>
      )}
    </div>
  );
}