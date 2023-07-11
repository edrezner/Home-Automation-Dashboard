import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useMutation } from "@apollo/client";
import { ADD_ROOM } from "../utils/mutations";
import { useHomeContext } from "../utils/GlobalState";

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

export default function AddRoomModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addRoom, { error }] = useMutation(ADD_ROOM);
  const [room, setRoom] = React.useState({
    name: "",
    type: "",
    settings: {},
    roomId: "",
  });

  const [state, dispatch] = useHomeContext();

  // const [room, setRooms] = React.useState('');

  const { currentHome } = state;
  console.log(currentHome);

  const handleAddRoom = async (event) => {
    event.preventDefault();
    const { name, type, currentHome } = room;

    const result = await addRoom({
      variables: { name, type, home: currentHome },
    });

    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  };

  function handleInputChange(e) {
    const name = e.target.name;
    setRoom({ ...room, [name]: e.target.value });
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
              value={room.name}
              onChange={handleInputChange}
              name="name"
              // fullWidth
              // required
            />
            <TextField
              select
              label="Type"
              value={room.type}
              onChange={handleInputChange}
              name="type"
              // fullWidth
              // required
            >
              <MenuItem value="Living Room">Living Room</MenuItem>
              <MenuItem value="Bedroom">Bedroom</MenuItem>
              <MenuItem value="Kitchen">Kitchen</MenuItem>
            </TextField>
            <Button type="submit" onClick={handleAddRoom}>
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
