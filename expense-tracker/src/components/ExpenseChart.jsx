import { useEffect, useRef } from 'react';

export default function ExpenseChart({ expenses }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    
    if (total === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.fillText('No expenses yet', canvas.width / 2, canvas.height / 2);
      return;
    }

    // Calculate category totals
    const categories = {};
    expenses.forEach((e) => {
      categories[e.category] = (categories[e.category] || 0) + e.amount;
    });

    const categoryList = Object.entries(categories);
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

    let startAngle = 0;

    categoryList.forEach(([cat, amt], i) => {
      const sliceAngle = (amt / total) * 2 * Math.PI;
      ctx.fillStyle = colors[i % colors.length];
      ctx.beginPath();
      ctx.moveTo(100, 100);
      ctx.arc(100, 100, 90, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      startAngle += sliceAngle;
    });

    // Legend
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    categoryList.forEach(([cat, amt], i) => {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(220, 30 + i * 25, 15, 15);
      ctx.fillStyle = 'white';
      ctx.fillText(`${cat}: ₹${amt}`, 240, 42 + i * 25);
    });
  }, [expenses]);

  return (
    <div className="card">
      <h3>📊 Expense Chart</h3>
      <canvas ref={canvasRef} width={320} height={220} />
    </div>
  );
}
