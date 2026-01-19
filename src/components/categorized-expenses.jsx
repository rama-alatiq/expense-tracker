import "./categorized-expenses.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function ExpensesByCategory({ expenses }) {
  const categoryTotals = expenses
    .filter((expense) => expense.amount.startsWith("-"))
    .reduce((acc, expense) => {
      const { category, amount } = expense;
      const value = Math.abs(parseFloat(amount.replace("$", "")));

      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += value;

      return acc;
    }, {});

  //convert the totals into an array for the pie chart
  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#F97316", "#A855F7", "#3B82F6"];

  return (
    <>
    <div className="expenses-by-category-main-container">
      <p>Expenses by Category</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie 
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={true}
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          >
            {
                chartData.map((entry,index)=>(
                    <Cell key={`cell-${index}`} fill={COLORS[index%COLORS.length]}/>
                ))
            }
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
        </PieChart>
      </ResponsiveContainer>
    <div className="display-categories">
        {
            chartData.map((item, index)=>(
                <div key={item.name} className="category-item">
                    <div className="category-color" style={{backgroundColor:COLORS[index%COLORS.length]}}>
                    </div>
                    <p>{item.name}</p>
                    <p>{`$${item.value}`}</p>
                </div>
            ))

        }

    </div>                
    </div>

    </>
  );
}

export default ExpensesByCategory;
