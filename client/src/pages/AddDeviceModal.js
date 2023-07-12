import * as React from "react";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useMutation } from "@apollo/client";
import { ADD_DEVICE } from "../utils/mutations";
import { defaultSettings } from "../utils/defaultSettings";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddDeviceModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addDevice, { error }] = useMutation(ADD_DEVICE);
  const [device, setDevice] = React.useState({
    name: "",
    type: "",
    settings: {}, // update this field with proper values with Pablo's functions
    roomId: "",
  });

  const { id } = useParams();

  const handleAddDevice = async (event) => {
    event.preventDefault();
    const { name, type, settings, roomId } = device;
    const settingsObject = { ...defaultSettings(type), ...settings };

    const result = await addDevice({
      variables: { name, type, settings: settingsObject, roomId: id },
    });

    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  };

  function handleInputChange(e) {
    const name = e.target.name;
    setDevice({ ...device, [name]: e.target.value });
  }

  return (
    <div>
      <Button onClick={handleOpen}>ADD A DEVICE</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ADD DEVICE
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please enter the name and type of your device
          </Typography>
          <br />
          <form>
            <TextField
              label="Name"
              value={device.name}
              onChange={handleInputChange}
              name="name"
              fullWidth
              required
            />
            <TextField
              select
              label="Type"
              value={device.type}
              onChange={handleInputChange}
              name="type"
              fullWidth
              required
              css={css`
                && {
                  margin-top: 16px;
                }
              `}
            >
              <MenuItem value="Television">Television</MenuItem>
              <MenuItem value="Speakers">Speakers</MenuItem>
              <MenuItem value="Lights">Lights</MenuItem>
              <MenuItem value="Thermostat">Thermostat</MenuItem>
            </TextField>
            <Button
              type="submit"
              onClick={handleAddDevice}
              css={css`
                && {
                  margin-top: 16px;
                }
              `}
            >
              Add
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

// onSubmit={handleSubmit}
// disabled={loading}
// next step; when submit send data to GQL
// onClick function that does the mutation
