import { useNavigate } from "react-router-dom";
type info = {
  src: string;
  title: string;
  text: string;
  btn: string;
};
function About1({ src, title, text, btn }: info) {
  const navigate = useNavigate();
  const HandleClick = () => navigate("./getStarted");
  return (
    <div className="about__container">
      <div className="about__us__img">
        <div className="about__us__img__wrapper">
          <img src={src} alt="image" />
        </div>
      </div>
      <div className="about__us__content">
        <h2>{title}</h2>
        <p>{text}</p>
        <button onClick={HandleClick}>{btn}</button>
      </div>
    </div>
  );
}

export default About1;
