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
import "./Device.css";

import Speaker from "../components/Speaker/Speaker";
import Thermostat from "../components/Thermostat/Thermostat";
import SwitchDevice from "../components/Switch/Switch";

import { useQuery, useMutation } from "@apollo/client";
// TODO: Correct module package
import { QUERY_ROOM_DEVICES } from "../utils/queries";

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

function Device({ name, type }) {
  const putaway = (
    <>
      <div>
        <ul>
          <li>
            <b>Name: </b>
            <span>{name}</span>
          </li>
          <li>
            <b>Type: </b>
            <span>{type}</span>
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <>
      {type === "SmartLight" && <SwitchDevice name={name} />}
      {type === "SmartThermo" && <Thermostat name={name} />}
      {type === "SmartSpeaker" && <Speaker name={name} />}
    </>
  );
}

export default function VerticalAccessibleSlider({ roomId }) {
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }
  // { loading, error, data, refetch }
  const { loading, error, data } = useQuery(QUERY_ROOM_DEVICES, {
    variables: { id: roomId },
  });

  // const devices = [
  //   {
  //     name: "Philips GoLite",
  //     type: "SmartLight",
  //   },
  //   {
  //     name: "ThermoFrost",
  //     type: "SmartThermo",
  //   },
  //   {
  //     name: "Yamaha",
  //     type: "SmartSpeaker",
  //   },
  // ];

  // <Box sx={{ height: 300 }}>

  return (
    <>
      {console.log(data)}
      {loading ? (
        "Please wait..."
      ) : (
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
          <div sx={{ height: 300 }}>
            {/* {devices.map(devObject => { */}
            {/* data.devices ?? */}

            {data.devices.map(({ type, name }, i) => {
              return (
                <Device key={"device-" + i} type={type} name={name}></Device>
              );
            })}
          </div>
          <hr />
          <img src={WireframeDevices}></img>
        </>
      )}
    </>
  );
}
