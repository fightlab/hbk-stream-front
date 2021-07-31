/* eslint-disable react/prop-types */
import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AspectRatio from "@material-ui/icons/AspectRatio";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
import PictureInPictureIcon from "@material-ui/icons/PictureInPicture";
import QueuePlayNext from "@material-ui/icons/QueuePlayNext";
import { toggleDarkMode } from "../../Services/helper";

const Home = (props) => (
  <>
    <CssBaseline />
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Habrewken Stream Tool Front
        </Typography>
        <List component="nav">
          <ListItem button component={Link} to="/tool">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Tool" />
          </ListItem>
          <ListItem button component={Link} to="/scoreboard">
            <ListItemIcon>
              <AspectRatio />
            </ListItemIcon>
            <ListItemText primary="Scoreboard" />
          </ListItem>
          <ListItem button component={Link} to="/camera">
            <ListItemIcon>
              <PictureInPictureIcon />
            </ListItemIcon>
            <ListItemText primary="Camera" />
          </ListItem>
          <ListItem button component={Link} to="/prestream">
            <ListItemIcon>
              <QueuePlayNext />
            </ListItemIcon>
            <ListItemText primary="Pre-stream" />
          </ListItem>
          <ListItem button onClick={() => props.setDarkMode(toggleDarkMode())}>
            <ListItemIcon>
              <SettingsBrightnessIcon />
            </ListItemIcon>
            <ListItemText primary="Toogle Dark Mode" />
          </ListItem>
        </List>
      </Box>
    </Container>
  </>
);

export default withRouter(Home);
