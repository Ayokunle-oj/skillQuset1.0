import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import "../index.css";

interface Para {
  icon: IconProp;
  text: string;
}
// this is the rates card
function Rates__items({ icon, text }: Para) {
  return (
    <div className="item__container">
      <div className="rates__img">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="rates__text">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Rates__items;
