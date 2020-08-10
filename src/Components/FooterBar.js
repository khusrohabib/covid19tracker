import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
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
        <Tab icon={<PhoneIcon />} label="Overall Status" />
        <Tab icon={<FavoriteIcon />} label="Country Wise" />
        <Tab icon={<PersonPinIcon />} label="Stats" />
      </Tabs>
    </Paper>
  );
}
