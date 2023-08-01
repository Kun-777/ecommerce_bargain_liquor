import React from 'react';
import { Typography, Link, Container, Grid, Paper } from '@material-ui/core';
import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} square>
      <Container maxWidth='lg'>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Typography
              variant='body2'
              gutterBottom
              className={classes.copyright}
            >
              &copy; {new Date().getFullYear()} Bargain Liquor
            </Typography>
            <div className={classes.div}>
              <Link href='/policy' className={classes.footerLink}>
                Privacy Policy
              </Link>
            </div>
            <div className={classes.div}>
              <Link href='/terms' className={classes.footerLink}>
                Terms of Service
              </Link>
            </div>
            <div className={classes.div}>
              <Link href='/contact' className={classes.footerLink}>
                Contact Us
              </Link>
            </div>
          </Grid>
          <Grid item>
            <Typography variant='body2' className={classes.contactInfo}>
              Contact: bargain.liquor.charlie@gmail.com | Phone: (281) 980-4875
            </Typography>
            <Typography variant='body2' className={classes.address}>
              13500 W Airport Blvd, Sugar Land, TX 77498
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Footer;
