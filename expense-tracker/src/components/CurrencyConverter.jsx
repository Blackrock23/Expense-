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
    const makeRequest = async (url, parser) => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.log(`API failed ${res.status}: ${url}`);
          throw new Error(`Status ${res.status}`);
        }
        const data = await res.json();
        setRate(parser(data));
        setLoading(false);
        return;
      } catch (e) {
        console.log('API error:', e);
      }
    };

    if (apiKey) {
      // Try paid API first
      makeRequest(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR?symbols=${currency}`, (data) => {
        if (data.result === "success") return data.conversion_rates[currency];
      }).catch(() => {
        // Fallback to free
        console.log('Falling back to free API');
        makeRequest(`https://api.exchangerate.host/latest?base=INR&symbols=${currency}`, (data) => data.rates[currency]);
      });
    } else {
      // No key, free only
      makeRequest(`https://api.exchangerate.host/latest?base=INR&symbols=${currency}`, (data) => data.rates[currency]);
    }
    setLoading(false);
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

      {rate && !loading && (
        <p>
          {currency}: {(total * rate).toFixed(2)}
        </p>
      )}
    </div>
  );
}
