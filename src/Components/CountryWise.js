import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: "0 auto",
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    color: "#3f51b5",
    textTransform: "capitalize",
  }
}));

export default function CountryWise(props) {
  const [globalData, setGlobalData] = useState({});
  const countrySelection = props.countrySelection;
  const [countries, setCountries] = useState({});
  const [loading, setLoading] = useState(true);
  const handleChange = (event) => {
    countrySelection[1](event.target.value);
  };
  useEffect(()=>{
    async function getCountries() {
      const response = await fetch(
        "https://api.thevirustracker.com/free-api?countryTotals=ALL"
      );
      let data = await response.json();
      setCountries(data.countryitems[0]);
      console.log(data.countryitems[0]);
      setLoading(false);
    }
    getCountries();
  },[])
  // Call API to fetch data we will use the React hook useEffect
  useEffect(() => {

    async function getData() {
      const response = await fetch(
        "https://api.thevirustracker.com/free-api?countryTotal=" +
          countrySelection[0]
      );
      let data = await response.json();
      if (data.countrydata !== undefined) {
        delete data.countrydata[0]["info"];
        setGlobalData(data.countrydata[0]);

      } else {
        alert("No data for selected country ");
      }
    }
    getData();
  }, [countrySelection]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
      loading ? (
        <CircularProgress />
      ) : (
      
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
              {Object.keys(countries).map((val, ind) => {
                return (
                  <option value={countries[val]["code"]}>
                    {countries[val]["title"]}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </div>
      <br/>
      <Grid container spacing={3}>
        {Object.keys(globalData).map((key, ind) => {
          return (
            <Grid item xs={12} sm={4} key={ind}>
              <Paper className={classes.paper} elevation={3}>
                <h3 className={classes.title}>{key.replace(/_/g, " ")}</h3>
                {globalData[key].toLocaleString()}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      </div>
    )}
    </div>
);
}
