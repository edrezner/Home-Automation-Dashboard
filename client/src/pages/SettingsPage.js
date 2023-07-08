import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Button from "@mui/material/Button";
import { Stack, Slider } from "@mui/material";
import Box from "@mui/material/Box";
import { VolumeDown, VolumeUp } from "@mui/icons-material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Grid, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { useState } from "react";
import WireframeDevices from "./wireframe-device.png";

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

export default function VerticalAccessibleSlider() {
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <h2>Devices</h2>
        <button
          id="logout"
          onClick={() => {
            /*TODO */
          }}
        >
          Logout
        </button>
      </Stack>
      <Box sx={{ height: 300 }}>
        <Slider
          sx={{
            '& input[type="range"]': {
              WebkitAppearance: "slider-vertical",
            },
          }}
          orientation="vertical"
          defaultValue={30}
          aria-label="Temperature"
          valueLabelDisplay="auto"
          onKeyDown={preventHorizontalKeyboardNavigation}
        />
      </Box>
      <hr />
      <img src={WireframeDevices}></img>
    </>
  );
}
