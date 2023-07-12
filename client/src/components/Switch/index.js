import * as React from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Grid, Typography } from "@mui/material";

export default function TvWidget({ name }) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  /*

    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label="On"
    />

  */
  return (

    <Grid item xs={12}>
      <Typography variant="overline" display="block" gutterBottom>
        ON/OFF
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="ON"
      />
    </Grid>
  );
}
