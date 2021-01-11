import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Typography } from "@material-ui/core";

// Drawer components
import {
  SwipeableDrawer as MUIDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import TimelineIcon from "@material-ui/icons/Timeline";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 200,
  },
}));

const NavBar = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const menuList = [
    {
      title: "Scoreboard",
      icon: <TimelineIcon />,
      onClick: () => {
        history.push("/");
        handleDrawerToggle();
      },
    },
    {
      title: "Score History",
      icon: <HistoryIcon />,
      onClick: () => {
        history.push("/history");
        handleDrawerToggle();
      },
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            className={classes.menuButton}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SlugBug Tracker
          </Typography>
          <MUIDrawer
            className={classes.drawer}
            open={openDrawer}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
          >
            <List>
              {menuList.map((item, index) => {
                const { title, icon, onClick } = item;
                return (
                  <ListItem button key={title} onClick={onClick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={title} />
                  </ListItem>
                );
              })}
            </List>
          </MUIDrawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
