import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const HomeList = () => {
  const [home, setHome] = React.useState('');

  const handleChange = (event) => {
    setHome(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Home</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={home}
          onChange={handleChange}
          autoWidth
          label="Home"
        >
          <MenuItem value={10}>Evan's Estate</MenuItem>
          <MenuItem value={21}>Eric's Estate</MenuItem>
          <MenuItem value={22}>Pablo's Penthouse</MenuItem>
        </Select>
      </FormControl>
      <Fab color="primary" aria-label="add"><AddIcon /></Fab>
    </div>
  );
}

export default HomeList;