import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useHomeContext } from '../../utils/GlobalState';
import {
  UPDATE_CURRENT_HOME
} from '../../utils/actions';

const HomeList = () => {
  const [state, dispatch] = useHomeContext();

  const [home, setHome] = React.useState('');
  const { loading, data } = useQuery(QUERY_USER);
  const userData = data?.me || data?.user || {};

  const handleChange = (event) => {
    setHome(event.target.value);
    dispatch({
      type: UPDATE_CURRENT_HOME,
      currentHome: event.target.value
    });
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

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
          {userData.homes?.map((home) => {
            return (
              <MenuItem value={home._id}>{home.name}</MenuItem>
            )
          })}
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