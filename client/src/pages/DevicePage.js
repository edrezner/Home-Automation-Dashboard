import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Button from "@mui/material/Button";
import { Stack, Slider } from "@mui/material";
import { VolumeDown, VolumeUp } from "@mui/icons-material";
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

const DevicePage = () => {
  const [activity, setActivity] = useState(0);
  const handleChange = (event, newValue) => {
    setActivity(newValue);
    console.log(newValue);
  };

  return (
    <div>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider aria-label="Volume" value={activity} onChange={handleChange} />
        <VolumeUp />
      </Stack>
      {/* <Slider disabled defaultValue={30} aria-label="Disabled slider" /> */}
    </div>
  );
};

export default DevicePage;
