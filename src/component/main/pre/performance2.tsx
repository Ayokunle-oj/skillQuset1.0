import "./index.css";
interface info {
  svg: string;
  title: string;
  text: string;
}
function Performance2({ title, text, svg }: info) {
  return (
    <div>
      <div className="performance__learning">
        <div className="performance__img">
          <img src={svg} alt="image" />
        </div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Performance2;
