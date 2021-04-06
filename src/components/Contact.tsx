import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FunctionComponent } from 'react';

// Styles override
const useStyles = makeStyles({
  root: {
    color: 'white',
  },
});

// About me section
const Contact: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <section id="contact">
      <Grid
        direction="column"
        justify="center"
        alignItems="center"
        container
        spacing={2}
      >
        <Grid item lg={12} xs={12} xl={12}>
          <Typography variant="h4" className={`wow fadeIn ${classes.root}`}>
            Contact
          </Typography>
        </Grid>
        <Grid item md={12} lg={12} xl={12} xs={12}>
          <Typography
            variant="subtitle1"
            className={`wow fadeIn ${classes.root}`}
          >
            You can get in touch at:
          </Typography>
        </Grid>
        <Grid item md={12} lg={12} xl={12} xs={12}>
          <Typography variant="subtitle1">
            <a href="mailto:contact@prutkowski.dev">contact@prutkowski.dev</a>
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
    </section>
  );
};

export default Contact;
