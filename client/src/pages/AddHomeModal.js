import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useMutation } from "@apollo/client";
import { ADD_HOME } from "../utils/mutations";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

export default function AddHomeModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addHome, { error }] = useMutation(ADD_HOME);

  const [homeName, setHomeName] = React.useState("");

  const handleAddRoom = async (event) => {
    event.preventDefault();

    const result = await addHome({
      variables: { homeName },
    });

    if (error) {
      console.error(error);
    } else {
      console.log(result);
      setOpen(false); /// close modal
      // loadRooms()
    }
  };

  function handleInputChange(e) {
    // const name = e.target.name;
    setHomeName(e.target.value);
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <AddCircleIcon color="primary" />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a New Home
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Enter a name for your Home
          </Typography>
          <form>
            <TextField
              label="Name"
              onChange={handleInputChange}
              name="name"
              // fullWidth
              // required
            />

            <Button type="submit" onClick={handleAddRoom}>
              ADD
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
