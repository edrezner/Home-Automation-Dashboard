import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Grid, Typography, FormControlLabel, Switch } from "@mui/material";
import { useState, useEffect } from "react";

const marks = [
  {
    value: 0,
    label: "0°F",
  },
  {
    value: 25,
    label: "25°F",
  },
  {
    value: 50,
    label: "50°F",
  },
  {
    value: 75,
    label: "75°F",
  },
  {
    value: 100,
    label: "100°F",
  },
];

function valuetext(value) {
  return `${value}°F`;
}

export default function TempWidget({ name }) {
  const [checked, setChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };
  
  const [value, setValue] = React.useState([60, 80]);
  const handleRangeChange = (event, newValue) => {
    setValue(newValue);
  };

  if (checked){
    return (
      <Grid item xs={12}>
      {/* <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleSwitchChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Range"
      /> 

      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleRangeChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        defaultValue={[60, 80]}
      />
      */}
    </Grid>
    )
  }
  return (
    <Grid item xs={12}>
      {/* <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleSwitchChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Range"
      /> */}
      <Slider
        track={false}
        aria-labelledby="track-false-slider"
        getAriaValueText={valuetext}
        defaultValue={70}
        marks={marks}
      />
      <Typography variant="overline" display="block" gutterBottom>
        TEMPERATURE
      </Typography>
    </Grid>
  );
}
