import "./NotFound.scss";

import qmark from "../../assets/qmark.svg";
import zero from "../../assets/zero.svg";


const NotFound = () => {
  return (
    <div class="not-found">
      <div class="img">
      <img src={qmark} alt="qmark" />
      <img src={zero} alt="zero" />
      <img src={qmark} alt="qmark" />
      </div>
    <h1>Not Found</h1>
    </div>
  );
};

export default NotFound;
