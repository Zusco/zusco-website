import React from "react";
// import PropTypes from "prop-types";

import { observer } from "mobx-react-lite";

// const thumbsize = 14;

const Slider = observer(({ store, handleSliderChange }) => {
  // const [avg, setAvg] = useState((min + max) / 2);
  // const [minVal, setMinVal] = useState(avg);
  // const [maxVal, setMaxVal] = useState(avg);
  const checkWindow = window.innerWidth;
  let width;
  if (checkWindow < 400) {
    width = 280;
  } else {
    width = 400;
  }

  // const minWidth =
  //   thumbsize + ((avg - min) / (max - min)) * (width - 2 * thumbsize);
  // const minPercent = ((minVal - min) / (avg - min)) * 100;
  // const maxPercent = ((maxVal - avg) / (max - avg)) * 100;
  const styles = {
    min: {
      width:
        store?.thumbsize +
        ((store?.avg - store?.min) / (store?.max - store?.min)) *
          (width - 2 * store?.thumbsize),
      left: 0,
      "--minRangePercent": `${store?.minPercent}%`,
    },
    max: {
      width:
        store?.thumbsize +
        ((store?.max - store?.avg) / (store?.max - store?.min)) *
          (width - 2 * store?.thumbsize),
      left:
        store?.thumbsize +
        ((store?.avg - store?.min) / (store?.max - store?.min)) *
          (width - 2 * store?.thumbsize),
      "--maxRangePercent": `${store?.maxPercent}%`,
    },
  };

  return (
    <div
      className="min-max-slider text-[32px]"
      data-legendnum="2"
      data-rangemin={store?.min}
      data-rangemax={store?.max}
      data-thumbsize={store?.thumbsize}
      data-rangewidth={store?.width}
    >
      <label htmlFor="min">Minimum price</label>
      <input
        id="min"
        className="min"
        style={styles.min}
        name="min"
        type="range"
        step="1"
        min={store?.min}
        max={store?.avg}
        value={store?.minVal}
        onChange={({ target }) => {
          store?.setMinVal(target);
          handleSliderChange();
        }}
      />
      <label htmlFor="max">Maximum price</label>
      <input
        id="max"
        className="max"
        style={styles.max}
        name="max"
        type="range"
        step="1"
        min={store?.avg}
        max={store?.max}
        value={store?.maxVal}
        onChange={({ target }) => {
          store?.setMaxVal(target);
          handleSliderChange();
        }}
      />
    </div>
  );
});

// Slider.propTypes = {
//   min: PropTypes.number,
//   max: PropTypes.number,
// };

export default Slider;
