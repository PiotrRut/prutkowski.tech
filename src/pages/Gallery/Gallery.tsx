import Button from '@components/Button';
import ImageCard from '@components/ImageCard';
import SEO from '@components/SEO';
import { PicButton } from '@content/PhotosPreview/PhotosPreview.styles';
import { Button as MUIButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BACKEND_URL from '@misc/backend';
import { palette } from '@theme/tokens';
import axios from 'axios';
import { domAnimation, LazyMotion, m as motion } from 'framer-motion';
import { NextPage } from 'next';
import React, { Fragment, useEffect, useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';

import { GalleryWrapper } from './Galllery.styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // position the dialog properly and add dark gray backdrop
    margin: -35,
    padding: theme.spacing(5),
    backgroundColor: palette.darkGray,
  },
  paper: {
    // set colour of the paper dialog
    backgroundColor: palette.darkGray,
  },
  snackbar: {
    // pull the snackbar up from the bottom on smaller screens
    [theme.breakpoints.down('xs')]: {
      bottom: 70,
    },
  },
  text: {
    color: 'white',
  },
}));

const Gallery: NextPage = () => {
  const [images, setImgs] = useState([{ lowRes: '', highRes: '' }]);
  const [selectedURLS, setUrl] = useState({ lowRes: '', highRes: '' });
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BACKEND_URL}/gallery/getAllPhotos`);
      setImgs(response.data.images.reverse());
    };
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LazyMotion features={domAnimation}>
      <SEO title="Gallery" />
      <Typography variant="h4" component="h1" className={classes.text}>
        📸 My Gallery
      </Typography>
      <GalleryWrapper>
        {images.map((image, index) => (
          <motion.div whileHover={{ scale: 1.1 }}>
            {image.lowRes && (
              <PicButton
                onClick={() => {
                  setUrl({
                    lowRes: image.lowRes,
                    highRes: image.highRes,
                  });
                  handleOpen();
                }}
                key={index}
              >
                <ImageCard path={image?.lowRes} />
              </PicButton>
            )}
          </motion.div>
        ))}
      </GalleryWrapper>

      <Button
        name="home"
        href="/"
        label="Back home"
        iconLeft={<BsChevronLeft />}
      />

      {/* Dialog with the selected picture for preview */}
      <Dialog classes={classes} onClose={handleClose} open={open} maxWidth="xs">
        <img src={selectedURLS.lowRes} width="auto" height="auto" />
      </Dialog>

      {/* Little snack bar with link to the full res version of each image */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        message="View full version"
        className={classes.snackbar}
        action={
          <Fragment>
            <MUIButton
              color="secondary"
              rel="noopener noreferrer"
              target="_blank"
              size="small"
              href={selectedURLS.highRes}
            >
              CLICK HERE
            </MUIButton>
          </Fragment>
        }
      />
    </LazyMotion>
  );
};

export default Gallery;
