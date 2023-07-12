import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import { QUERY_HOME_ROOMS } from "../../utils/queries";
import { DELETE_ROOM } from "../../utils/mutations";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useHomeContext } from "../../utils/GlobalState";
import { getRoomImage } from "../../utils/getImages";
import Auth from "../../utils/auth";
import { REMOVE_ROOM } from "../../utils/actions";
import AddRoomModal from "../../pages/AddRoomModal";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import houseImage from "../../assets/images/homepage.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Home Automation
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const RoomList = () => {
  const [state, dispatch] = useHomeContext();

  const [room, setRoom] = React.useState("");
  const { currentHome } = state;
  const { loading, data } = useQuery(QUERY_HOME_ROOMS, {
    variables: { id: currentHome },
  });

  // const [getRooms, {data}] = useLazyQuery(QUERY_HOME_ROOMS)

  // //loadRooms();

  // function loadRooms(){
  //   getRooms({
  //     variables: {id: currentHome}
  //   })
  // }

  // useEffect(() => {
  //   loadRooms();
  // })
  // if(!data){
  //   return <h2>LOADING...</h2>;
  // }

  // console.log(JSON.stringify(data.homeRooms[0]._id, 2, null));

  // const handleChange = (event) => {
  //   setRoom(event.target.value);
  //   dispatch({
  //     type: UPDATE_CURRENT_ROOM,
  //     currentHome: event.target.value
  //   });
  // };

  const [deleteRoom, { error }] = useMutation(DELETE_ROOM);

  const handleDeleteRoom = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if (!token) {
      return false;
    }

    try {
      const response = await deleteRoom({
        variables: { _id, homeId: currentHome },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: REMOVE_ROOM,
      _id: _id,
    });
    console.log(state);
  };

  // if (!data) {
  //   return <h2>LOADING...</h2>;
  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data?.home?.rooms.map((room) => {
              return (
                <Grid item key={room} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <a href={`/rooms/${room._id}`}>
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image={getRoomImage(room.type)}
                        value={room._id}
                      />
                    </a>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {room.name}
                      </Typography>
                      <Typography>{room.type}</Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton onClick={() => handleDeleteRoom(room._id)}>
                        <RemoveCircle sx={{ color: red[500] }} />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
            <Grid item key={room} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image={houseImage}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Add Room
                  </Typography>
                </CardContent>
                <CardActions>
                  <AddRoomModal />
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
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
      {/* End footer */}
    </ThemeProvider>
  );
};

export default RoomList;
