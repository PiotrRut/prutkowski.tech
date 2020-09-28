import React, { useState, useEffect } from "react";
import { Link } from "gatsby"
import Grid from '@material-ui/core/Grid'
import projects from '../misc/projects.json'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 360,
    background: '#212121',
  },
  media: {
    height: 140,
  },
  text: {
    color: 'white'
  }
});

// Projects I am involved in with at work
function OtherProjectsPreview() {
  const classes = useStyles();
  const img = require.context('../images', true);

  return (
    <section id="proj-preview">
      <Grid direction="column" justify="center" alignItems="center" container spacing={3}>
        <Grid item lg={12} xs={12} xl={12}>
          <b><Typography variant="h4" className={classes.text}>Work projects</Typography></b>
        </Grid>
        <Grid item md={12} lg={12} xl={12} xs={12}>
        </Grid>
        <Grid container item direction="row" justify="center" alignItems="center" spacing={4}>
          {
            projects.map((item, i) => (
              <Grid item md={6} lg={6}
                className="wow fadeIn"
                key={item.title}
                style={{
                  animationDelay: `${i * 70 + 70}ms`,
                }}
              >
                <Card className={classes.root}>
                  <CardMedia title={item.title} className={classes.media} image={img(`./${item.picture}`)} />
                  <CardContent>
                  <Typography gutterBottom className={classes.text} variant="h6" component="h2">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" className={classes.text} component="p">
                    {item.description}
                  </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
      <br />
      <br />
    </section>
  );
}

export default OtherProjectsPreview;   