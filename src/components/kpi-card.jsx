function KpiCard({ title, amount, icon, color }) {
  const cardStyle = {
    backgroundColor: color,
    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)`,
  };
  return (
    <div className="kpi-card" style={cardStyle}>
      <div className="card-icon">
        <i className={icon}></i>
      </div>
      <div className="card-text">
        <p>{title}</p>
        <p>{amount}</p>
      </div>
    </div>
  );
}
export default KpiCard;
