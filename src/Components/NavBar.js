import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { fade, makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar({ countrySelection }) {
  const classes = useStyles();

  const [countries, setCountries] = useState([{}]);

  useEffect(() => {
    async function getCountries() {
      const response = await fetch(
        "http://countryapi.gear.host/v1/Country/getCountries"
      );
      let data = await response.json();
      setCountries(data.Response);
      console.log(data.Response);
    }
    getCountries();
  }, []);

  const handleChange = (event)=>{
    countrySelection[1](event.target.value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            COVID 19 Tracker
          </Typography>
          <div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Select Country</InputLabel>
                <Select
                  native
                  value={countrySelection[0]}
                  onChange={handleChange}
                  inputProps={{
                    name: "age",
                    id: "age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  {
                    countries.map((val, ind) => {
                        return <option value={val.Alpha2Code}>{val.Name}</option>;
                    })
                  }
                </Select>
              </FormControl>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
