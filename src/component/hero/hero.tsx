import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import dallas2 from "../../assets/dallas2.jpg";
import spenser2 from "../../assets/spenser2.jpg";
import "./index.css";
import "../../app.css";
import { useEffect, useState } from "react";

function Hero() {
  const [back, setBack] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleClick = () => navigate("./discover");

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Fade to black
      setIsDark(true);

      // 2. Switch image AFTER fade
      setTimeout(() => {
        setBack((prev) => !prev);

        // 3. Fade back in
        setIsDark(false);
      }, 1000);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero__container">
      <div
        className="hero__img"
        style={{
          backgroundImage: `url(${back ? dallas2 : spenser2})`,
        }}
      >
        <div className={`overlay ${isDark ? "dark" : ""}`} />

        <div className="hero__text">
          <h2>
            Good <b>Coaching</b> is <br />
            good <b>teaching </b>& <br />
            nothing else
          </h2>
          <p className="text">A new way to learn & get knowledge</p>

          <div className="hero__btn">
            <button onClick={handleClick} className="courses">
              View courses
            </button>

            <button className="Get__started">
              <p> Get Started</p>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
