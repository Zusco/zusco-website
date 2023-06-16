import { LoadingWrapper } from "./style";
import PropTypes from "prop-types";

const Loading = ({ icon, className, body, size = "small" }) => (
  <LoadingWrapper size={size} className={className}>
    <div className="content">
      <div className="loader"></div>
      <div className="loader-content">{icon}</div>
    </div>
    <p className="loading-text">{body}</p>
  </LoadingWrapper>
);

const CircleSpinner = () => {
  return <div className="circle-spinner" />;
};
Loading.propTypes = {
  icon: PropTypes.elementType,
  className: PropTypes.string,
  body: PropTypes.elementType,
  size: PropTypes.oneOf(["tiny", "small", "medium", "large", "xm"]),
};
export { CircleSpinner };
export default Loading;
