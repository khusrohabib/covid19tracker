import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EqualizerSharpIcon from '@material-ui/icons/EqualizerSharp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PublicSharpIcon from '@material-ui/icons/PublicSharp';

const useStyles = makeStyles({

});

export default function FooterBar({tabSelection}) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    tabSelection[1](newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={tabSelection[0]}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab label="Overall Status" />
        <Tab label="Country Wise" />
        <Tab label="Top 20" />
      </Tabs>
    </Paper>
  );
}
