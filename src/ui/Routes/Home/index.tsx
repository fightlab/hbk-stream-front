import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AspectRatio from '@material-ui/icons/AspectRatio';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';

export default function Home() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
          Habrewken Stream Tool Front
          </Typography>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Tool" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AspectRatio />
              </ListItemIcon>
              <ListItemText primary="Scoreboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PictureInPictureIcon />
              </ListItemIcon>
              <ListItemText primary="Camera" />
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  );
}
