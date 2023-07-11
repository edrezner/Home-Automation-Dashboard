import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import { useMutation } from '@apollo/client';
// import { ADD_DEVICE } from '../../utils/mutations';

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
  const [device, setDevice] = React.useState({
    name: "",
    type: "",
    settings: {}, // update this field with proper values with Pablo's functions
    roomId: "",
  });

  function handleInputChange(e) {
    const name = e.target.name;
    setDevice({ ...device, [name]: e.target.value });
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <form>
            <TextField
              label="Name"
              value={device.name}
              onChange={handleInputChange}
              name="name"
              // fullWidth
              // required
            />
            <TextField
              select
              label="Type"
              value={device.type}
              onChange={handleInputChange}
              name="type"
              // fullWidth
              // required
            >
              <MenuItem value="television">Television</MenuItem>
              <MenuItem value="speakers">Speakers</MenuItem>
              <MenuItem value="lights">Lights</MenuItem>
              <MenuItem value="thermostat">Thermostat</MenuItem>
            </TextField>
            <Button type="submit">Add</Button>
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
