import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Grid,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const DateTimePicker = ({ setScheduledDatetime }) => {
  const classes = useStyles();
  const [tempDate, setTempDate] = useState(new Date());
  const [tempTime, setTempTime] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    // Set default time to the next earliest hour
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1);
    nextHour.setMinutes(0);
    setTempTime(nextHour);
  }, []);

  useEffect(() => {
    if (tempTime !== null) {
      setScheduledDatetime(
        `${
          tempDate.getMonth() + 1
        }/${tempDate.getDate()}/${tempDate.getFullYear()} ${tempTime
          .getHours()
          .toString()
          .padStart(2, '0')}:${tempTime
          .getMinutes()
          .toString()
          .padStart(2, '0')}`
      );
    }
  }, [tempDate, tempTime, setScheduledDatetime]);

  const handleDateChange = (date) => {
    setTempDate(date);
    setModified(true);
  };

  const handleTimeChange = (time) => {
    setTempTime(time);
    setModified(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Delivery Time</Typography>
          <Typography className={classes.secondaryHeading}>
            {modified
              ? `Deliver at ${
                  tempDate.getMonth() + 1
                }/${tempDate.getDate()}/${tempDate.getFullYear()} 
              ${tempTime.getHours().toString().padStart(2, '0')}:${tempTime
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}`
              : 'As soon as possible'}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                disablePast
                label='Select a day'
                value={tempDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                shouldDisableDate={(date) => date.getDay() === 0}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker
                minTime={new Date(0, 0, 0, 10)}
                maxTime={new Date(0, 0, 0, 21, 0)}
                label='Select a time'
                value={tempTime}
                onChange={handleTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
