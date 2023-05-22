import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceSlider = (props) => {
  return (
    <div>
      <Slider
        trackStyle={{
          backgroundColor: "#00509D",
          borderRadius: "1.5px",
          padding: "3px 0px",
        }}
        railStyle={{
          backgroundColor: "#EFF1F4",
          borderRadius: "1.5px",
          padding: "3px 0px",
        }}
        handleStyle={{
          width: "32px",
          height: "32px",
          top: "-3px",
          backgroundColor: "#00509D",
          opacity: 1,
          border: "solid 2px #00519d93",
        }}
        {...props}
      />
    </div>
  );
};
export default PriceSlider;
