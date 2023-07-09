import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0°F",
  },
  {
    value: 40,
    label: "40°F",
  },
  {
    value: 80,
    label: "80°F",
  },
  {
    value: 100,
    label: "100°F",
  },
];

function valuetext(value) {
  return `${value}°F`;
}

export default function DiscreteSliderLabel({ name }) {
  return (
    <div sx={{ width: 300 }}>
      <Slider
        aria-label="Always visible"
        orientation="vertical"
        defaultValue={70}
        getAriaValueText={valuetext}
        step={10}
        marks={marks}
        valueLabelDisplay="on"
      />
    </div>
  );
}
