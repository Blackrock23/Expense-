// utils/localStorage.js
export const loadExpenses = () => {
  const data = localStorage.getItem("expenses");
  return data ? JSON.parse(data) : [];
};

export const saveExpenses = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};