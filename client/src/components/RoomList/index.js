import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { QUERY_HOME_ROOMS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useHomeContext } from '../../utils/GlobalState';
import {
  UPDATE_CURRENT_ROOM
} from '../../utils/actions';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Home Automation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const RoomList = () => {
  const [state, dispatch] = useHomeContext();

  const [room, setRoom] = React.useState('');

  const { currentHome } = state;

  const { loading, data } = useQuery(QUERY_HOME_ROOMS, {
    variables: { id: currentHome }
  });

  // console.log(JSON.stringify(data.homeRooms[0]._id, 2, null));

  // const handleChange = (event) => {
  //   setRoom(event.target.value);
  //   dispatch({
  //     type: UPDATE_CURRENT_ROOM,
  //     currentHome: event.target.value
  //   });
  // };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const handleRoomClick = () => {

  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data?.homeRooms.map((room) => (
              <Grid item key={room} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <a href={`/rooms/${room._id}`}>
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                    value={room._id}
                  />
                  </a>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {room.name}
                    </Typography>
                    <Typography>
                      {room.type}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"><RemoveCircleOutlineIcon /></Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default RoomList;