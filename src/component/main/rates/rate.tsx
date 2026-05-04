import { faLaptopFile } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faFileShield } from "@fortawesome/free-solid-svg-icons";
import Rates__items from "./rates components/rates_item";
import "./index.css";
// rates card container
function Rate() {
  return (
    <div className="rates__container">
      <Rates__items icon={faLaptopFile} text="over 300 courses" />
      <Rates__items icon={faUsers} text="over 1,000 users" />
      <Rates__items icon={faUserTie} text="over 50 teachers" />
      <Rates__items icon={faFileShield} text="over 2,000 study materials" />
    </div>
  );
}

export default Rate;
