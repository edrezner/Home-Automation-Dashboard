import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Grid, Typography } from "@mui/material";

const marks = [
  {
    value: 0,
    label: <VolumeDown />,
  },
  {
    value: 100,
    label: <VolumeUp/>,
  },
];

export default function SpeakerWidget({ name }) {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <div sx={{ width: 200 }}>
      // <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
       <Grid item xs={12}>
        <Slider 
        aria-label="Volume" 
        value={value} 
        onChange={handleChange} 
        marks={marks}
        />
        <Typography variant="overline" display="block" gutterBottom>
        VOLUME
      </Typography>
      </Grid>
      // </Stack>
    // </div>
  );
}
