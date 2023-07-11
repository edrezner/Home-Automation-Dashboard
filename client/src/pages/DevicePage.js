import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Link, useParams } from "react-router-dom";
import { useHomeContext } from "../utils/GlobalState";
import Button from "@mui/material/Button";
import { Stack, Slider } from "@mui/material";
import Box from "@mui/material/Box";
import { VolumeDown, VolumeUp } from "@mui/icons-material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Grid, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import "./Device.css";
import { Modal } from "@mui/material";
import AddDeviceModal from "./AddDeviceModal";

import LightWidget from "../components/Brightness";
import SpeakerWidget from "../components/Speaker";
import TempWidget from "../components/Thermostat";
import TvWidget from "../components/Switch";

import { useQuery, useMutation } from "@apollo/client";
// TODO: Correct module package
import { QUERY_ROOM_DEVICES } from "../utils/queries";

// function Device({ name, type }) {
//   const putaway = (
//     <>
//       <div>
//         <ul>
//           <li>
//             <b>Name: </b>
//             <span>{name}</span>
//           </li>
//           <li>
//             <b>Type: </b>
//             <span>{type}</span>
//           </li>
//         </ul>
//       </div>
//     </>
//   );

//   return (
//     <>
//       {type === "Lights" && <SwitchDevice name={name} />}
//       {type === "Temp" && <Thermostat name={name} />}
//       {type === "Speakers" && <Speaker name={name} />}
//     </>
//   );
// }

// If error, check if it works without ()

export default function RenderDevices() {
  const [state, dispatch] = useHomeContext();
  const { id } = useParams();
  const [currentDevice, setCurrentDevice] = useState({});
  const { loading, error, data } = useQuery(QUERY_ROOM_DEVICES, {
    variables: { id: id },
  });
  const { devices, rooms } = state;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (devices.length) {
      setCurrentDevice(devices.find((device) => device._id === id));
    }
    if (!loading) console.log({ loading, error, data });
  }, [loading, data]);

  function widgetRenderer(deviceType) {
    switch (deviceType) {
      case "Thermostat":
        return <TempWidget />;
      case "Lights":
        return <LightWidget />;
      case "Television":
        return <TvWidget />;
      case "Speakers":
        return <SpeakerWidget />;
    }
  }

  return (
    <>
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

            {data?.roomDevices.map(({ type, name, _id }, i) => {
              return widgetRenderer(type);
            })}
          </div>
          <hr />

          <AddDeviceModal />
        </>
      )}
    </>
  );
}
