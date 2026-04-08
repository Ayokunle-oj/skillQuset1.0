type info = {
  src: string;
  title: string;
  text: string;
};
function About1({ src, title, text }: info) {
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
        <button>Get started</button>
      </div>
    </div>
  );
}

export default About1;
