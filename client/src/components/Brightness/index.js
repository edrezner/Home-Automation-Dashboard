import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Grid, Typography } from "@mui/material";

const marks = [
  {
    value: 0,
    label: "OFF",
  },
  {
    value: 100,
    label: "ON",
  },
];

export default function LightWidget() {
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  const [value, setValue] = React.useState(100);

  const handleLightChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={12}>
      <Typography variant="overline" display="block" gutterBottom>
        DIMMER
      </Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleLightChange}
        valueLabelDisplay="auto"
        defaultValue={100}
        marks={marks}
      />
    </Grid>
  );
}
