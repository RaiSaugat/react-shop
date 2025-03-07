import './informationView.scss';

function InformationView({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="information__wrapper">
      <p className="label">{label}</p>
      <div className="value">{value}</div>
    </div>
  );
}

export default InformationView;
