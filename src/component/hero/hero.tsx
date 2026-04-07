import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import dallas2 from "../../assets/dallas2.jpg";
import spenser2 from "../../assets/spenser2.jpg";
import "./index.css";
import { useEffect, useRef, useState } from "react";

function Hero() {
  const [back, setBack] = useState<boolean>(true);
  // const [isDark, setIsDark] = useState<boolean>(false);

  // We use a ref to hold the interval so we can safely clear it on unmount
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useNavigate();
  const handleClick = () => navigate("./discover");

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // STEP 1: Fade the overlay to black immediately
      // setIsDark(true);

      // STEP 2: After 1s (overlay is now fully dark), swap the background image
      setTimeout(() => {
        setBack((prev) => !prev);

        // STEP 3: After the image has swapped, fade the overlay back out.
        // This is in its OWN nested setTimeout to prevent React 18's automatic
        // batching from grouping setBack + setIsDark(false) into a single render,
        // which would cause the dark overlay to never visibly persist.
        setTimeout(() => {
          // setIsDark(false);
        }, 50); // small delay — just enough to let the image swap render first
      }, 1000);
    }, 20000);

    // Cleanup: clear the interval when the component unmounts
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // empty deps — runs once on mount

  return (
    <div className="hero__container">
      <div
        className="hero__img"
        style={{
          backgroundImage: `url(${back ? dallas2 : spenser2})`,
        }}
      >
        {/* Overlay fades to black during image transition */}
        {/* <div className={`overlay ${isDark ? "dark" : ""}`} /> */}

        <div className="hero__text">
          <h2>
            Good Coaching is <br />
            good teaching & <br />
            nothing else
          </h2>
          <p className="text">A new way to learn &amp; get knowledge</p>

          <div className="hero__btn">
            <button onClick={handleClick} className="courses">
              View courses
            </button>

            <button className="Get__started">
              <p>Get Started</p>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
