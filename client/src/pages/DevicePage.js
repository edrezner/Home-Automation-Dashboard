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
import WireframeDevices from "./wireframe-device.png";
import "./Device.css";
import { Modal } from "@mui/material";
import AddDeviceModal from "./AddDeviceModal";

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
      {type === "Lights" && <SwitchDevice name={name} />}
      {type === "Temp" && <Thermostat name={name} />}
      {type === "Speakers" && <Speaker name={name} />}
    </>
  );
}
// const roomId = "64ab1fe8fc66c11649bfbf92";
// id: "64ab3d1dad3cf2165027a442"
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
          <div style={{ height: 300 }}>
            {data?.roomDevices.map(({ type, name }, i) => {
              return (
                <Device key={"device-" + i} type={type} name={name}></Device>
              );
            })}
          </div>
          <hr />
          <img src={WireframeDevices} alt="Wireframe Devices" />
          <AddDeviceModal />
        </>
      )}
    </>
  );
}
