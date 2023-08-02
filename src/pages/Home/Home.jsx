import React, { useRef } from 'react';
import { Grid, Typography, ButtonBase } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Products, Searchfilters } from '../../components';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.jpg';
import img6 from '../../assets/img6.jpg';
import img7 from '../../assets/img7.jpg';
import img8 from '../../assets/img8.jpg';
import useStyles from './styles';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 1,
    imgPath: img1,
  },
  {
    label: 2,
    imgPath: img2,
  },
  {
    label: 3,
    imgPath: img3,
  },
  {
    label: 4,
    imgPath: img4,
  },
  {
    label: 5,
    imgPath: img5,
  },
  {
    label: 6,
    imgPath: img6,
  },
  {
    label: 7,
    imgPath: img7,
  },
  {
    label: 8,
    imgPath: img8,
  },
];

const Home = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <main className={classes.content} justifycontent='flex-start'>
      <AutoPlaySwipeableViews
        axis='x-reverse'
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <div className={classes.overlay}>
        <Typography className={classes.title}>Bargain Liquor</Typography>
        <Typography className={classes.subtitle}>
          @ 13500 W Airport Blvd, Sugar Land, TX 77498
        </Typography>
        <ButtonBase
          focusRipple
          className={classes.shopnow}
          onClick={handleClick}
        >
          <span className={classes.imageButton}>
            <Typography
              component='span'
              variant='subtitle1'
              color='inherit'
              className={classes.shopnowText}
            >
              Shop now
            </Typography>
          </span>
        </ButtonBase>
      </div>
      <div ref={ref} className={classes.products}></div>
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Searchfilters />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Products />
        </Grid>
      </Grid>
    </main>
  );
};

export default Home;
