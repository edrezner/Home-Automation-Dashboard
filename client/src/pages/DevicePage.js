import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useHomeContext } from "../utils/GlobalState";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid, Typography, Slider } from "@mui/material";
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import "./Device.css";
import AddDeviceModal from "./AddDeviceModal";
import Copyright from "../components/Copyright";

import LightWidget from "../components/Brightness";
import SpeakerWidget from "../components/Speaker";
import TempWidget from "../components/Thermostat";
import TvWidget from "../components/Switch";

import { useQuery, useMutation } from "@apollo/client";
// TODO: Correct module package
import { QUERY_ROOM } from "../utils/queries";

export default function RenderDevices() {
  const [state, dispatch] = useHomeContext();
  const { id } = useParams();
  const [currentDevice, setCurrentDevice] = useState({});
  const { loading, error, data } = useQuery(QUERY_ROOM, {
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
            <h2 className="text">Devices</h2>
          </Stack>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={6} sx={{ padding: 6 }}>
              {/* <div sx={{ height: 300 }}> */}
              {/* {devices.map(devObject => { */}
              {/* data.devices ?? */}

              {data?.room?.devices.map(({ type, name, _id }, i) => {
                const widgetEl = widgetRenderer(type);
                return (
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        height: 200,
                        // border: 1,
                        borderRadius: 1.5,
                        fontFamily: "arial",
                        fontWeight: 150,
                        padding: 5,
                      }}
                    >
                      <Typography variant="button" display="block" gutterBottom>
                        {name}
                      </Typography>
                      {widgetEl}
                    </Box>
                  </Grid>
                );
              })}
              {/* </div> */}
            </Grid>
            <AddDeviceModal />
          </Box>
          <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Developed by Group 4. All rights reserved.
            </Typography>

            {/* <AddRoomModal loadRooms={loadRooms} /> */}
            <Copyright />
          </Box>
        </>
      )}
    </>
  );
}
