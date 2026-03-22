import { useEffect, useState } from "react";

export default function CurrencyConverter({ expenses }) {
  const [rate, setRate] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdate, setLastUpdate] = useState(0);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  useEffect(() => {
    setLoading(true);
    setError("");

    const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
    if (!apiKey) {
      setError("API key missing. Check .env file.");
      setLoading(false);
      return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR?symbols=${currency}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          setRate(data.conversion_rates[currency]);
        } else {
          setError("API error: " + (data.error_info || "Unknown"));
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load exchange rate");
        setLoading(false);
      });
  }, [currency, lastUpdate]);

  return (
    <div className="card">
      <h3>Currency Converter</h3>

      <select onChange={(e) => setCurrency(e.target.value)}>
        <option>USD</option>
        <option>EUR</option>
        <option>GBP</option>
        <option>INR</option>
      </select>
      <button onClick={() => setLastUpdate(Date.now())} style={{fontSize: '12px', padding: '5px 10px'}}>
        🔄 Refresh
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {rate && !loading && !error && (
        <p>
          {currency}: {(total * rate).toFixed(2)}
        </p>
      )}
    </div>
  );
}
