import { useNavigate } from "react-router-dom";
type info = {
  src: string;
  title: string;
  text: string;
};
function About2({ src, title, text }: info) {
  const navigate = useNavigate();
  const handleClick = () => navigate("./about");
  return (
    <div className="about__container">
      <div className="about__us__content2">
        <h2>{title}</h2>
        <p>{text}</p>
        <button onClick={handleClick}>Learn more</button>
      </div>
      <div className="about__us__img">
        <div className="about__us__img__wrapper2">
          <img src={src} alt="image" />
        </div>
      </div>
    </div>
  );
}

export default About2;
