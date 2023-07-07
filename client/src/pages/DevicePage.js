import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Button from "@mui/material/Button";
import { Stack, Slider } from "@mui/material";
import { VolumeDown, VolumeUp } from "@mui/icons-material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Grid, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { useState } from "react";

// const styles = {
//   deviceContainer: css`
//     padding: 16px;
//     background-color: #f5f5f5;
//   `,
//   deviceCard: css`
//     padding: 16px;
//     margin-bottom: 16px;
//     background-color: #ffffff;
//     border: 1px solid #e0e0e0;
//     border-radius: 4px;
//   `,
//   deviceName: css`
//     font-weight: bold;
//   `,
// };

function valuetext(value) {
  return `${value}°F`;
}

const marks = [
  {
    value: 0,
    label: "0°F",
  },
  {
    value: 50,
    label: "50°F",
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

const DevicePage = () => {
  const [activity, setActivity] = useState(30);
  const handleChange = (event, newValue) => {
    setActivity(newValue);
    console.log(newValue);
  };

  return (
    <div>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider
          aria-label="Volume"
          value={activity}
          defaultValue={50}
          onChange={handleChange}
        />
        <VolumeUp />
      </Stack>
      {/* <Slider disabled defaultValue={30} aria-label="Disabled slider" /> */}
      <Stack sx={{ height: 200 }} spacing={1} direction="row">
        <Slider
          getAriaLabel={() => "Temperature"}
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={[50, 80]}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Stack>
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="On" />
      </FormGroup>
    </div>
  );
};

export default DevicePage;
