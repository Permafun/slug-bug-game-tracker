import React from "react";
import { Button as MUIButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export default function Button(props) {
  const { size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <MUIButton
      size={size}
      color={color || "primary"}
      variant={variant || "contained"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root }}
    >
      {props.children}
    </MUIButton>
  );
}
