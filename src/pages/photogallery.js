import React, { useState, useEffect } from "react";
import { Link } from 'gatsby'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import SEO from '../components/seo'
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import devApi from '../apiRoutes/devApi'
import prodApi from '../apiRoutes/prodApi'
import Layout from "../components/layout";
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: -35,
    padding: theme.spacing(5),
    backgroundColor: '#212121'
  },
  paper: { // set colour of the paper dialog
    backgroundColor: '#212121',
    color: 'white'
  }
}));


// The Gallery page which displays my images stored in a MS Azure container
function PhotoGallery() {
  const [images, setImgs] = useState([{lowRes: '', highRes: ''}])
  const [selectedURLS, setUrl] = useState([])
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false)
  const classes = useStyles();

  const BACKEND_URL = process.env.NODE_ENV === 'production' ? prodApi : devApi
  // Fetch all image URLs from Azure via my backend and append to array
  useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`${BACKEND_URL}/blobs`);
        setImgs(response.data);
    }
    fetchData();
  }, []);
  console.log(images)

  // Open picture dialog
  const handleOpen = () => {
    setOpen(true);
  };
  // Close picture dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Open URL snack bar
  const openSnackBar= () => {
    setOpenSnack(true);
  };
  // Close URL snack bar
  const closeSnackBar = () => {
    setOpenSnack(false);
  };
  

  return (
    <Layout>
      <SEO keywords={[`piotr`, `rutkowski`, `prutkowski`, `photography`, `gallery`, `pictures`]} title="Photo Gallery"/>
      <div className="container grid">
        <br/>
        <Grid direction="row" justify="center" alignItems="center" container spacing={4}>
          <Grid Grid item lg={12} xs={12} xl={12}>
            <br/>
            <b><h2 className="text-gray-400 text-center wow fadeIn"><span>📸</span> My Gallery</h2></b>
          </Grid>
          <Grid item md={12} lg={12} xl={12}>
            <h6 className="text-gray-400 text-center wow fadeIn">
              Here you can see some of the pictures I have taken over the last few months, and which I am 
              proud of!
            </h6>
            <h6 className="text-gray-400 text-center wow fadeIn">
              All images are stored on a remote server, which goes to sleep after some inactivity. Please allow
              a few seconds for the server to spin up again! 
            </h6>
            <br/>
            <h6 className="text-gray-400 text-center wow fadeIn">
              Want more? Visit my {" "}
              <a className="text-gray-400" href="https://www.instagram.com/prutkowskii/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>.
            </h6>
          </Grid>
          {
            images.map((image, index) => (
              <Grid item
                className="wow fadeIn"
                key={image.lowRes}
                style={{
                  animationDelay: `${index * 100 + 100}ms`,
                }}
              >
              <Paper elevation={3} style={{width: '200px', maxHeight: '110vh', padding: '15px', background: '#212121',}}>
                <Grid direction="column" container spacing={2}>
                  <Grid item>
                    <a className="cursor-pointer">
                      <img 
                        src={image.lowRes} 
                        height="200" width="200" 
                        onClick={() => { setUrl({lowRes: image.lowRes, highRes: image.highRes}); handleOpen(); openSnackBar();}}
                      />
                    </a>
                  </Grid>
                </Grid>
              </Paper>
              </Grid>
            ))
          }
        </Grid>
        <br/>
        <Grid container direction="column" justify="center" alignItems="center" spacing={10}>
          <Grid item lg={12} xs={12} xl={12}>
            <br/>
            <Link className="no-underline text-black" to="/">
            <Button className="wow fadeIn" variant="contained" color="inherit" startIcon={<KeyboardBackspaceIcon/>}>
              Return home
            </Button>
            </Link>
          </Grid>
        </Grid>

        {/* Dialog with the selected picture for preview */}
        <Dialog 
          classes={classes} 
          onClose={handleClose} 
          aria-labelledby="customized-dialog-title" 
          open={open}
          scroll="body"
          maxWidth="xs"
        >
          <div className={classes.paper}>
            <img className="photoPreview" src={selectedURLS.lowRes}/>
          </div>

        </Dialog>
        
        {/* Little snack bar with link to the full res version of each image */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={openSnack}
          onClose={closeSnackBar}
          message="View full version"
          action={
            <React.Fragment>
              <Button color="secondary" rel="noopener noreferrer" target="_blank" size="small" href={selectedURLS.highRes}>
                CLICK HERE
              </Button>
            </React.Fragment>
        }
        />
        
        <br/><br/><br/>
      </div>
    </Layout>
  );
}

export default PhotoGallery;