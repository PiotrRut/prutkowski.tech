import LanguageBlob from '@components/LanguageBlob';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GradeIcon from '@material-ui/icons/Grade';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import BACKEND_URL from '@misc/backend';
import axios from 'axios';
import SourceFork from 'mdi-material-ui/SourceFork';
import Link from 'next/link';
import { FunctionComponent,useEffect, useState } from 'react';

import { Repo } from './GitProjectsPreview.models';

// Styles override
const useStyles = makeStyles({
  root: {
    color: 'white',
  },
});

// The projects section on the main page, with three latest
const GitProjectsPreview: FunctionComponent = () => {
  const classes = useStyles();
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BACKEND_URL}/platforms/github/repos`);
      setRepos(response.data);
    };
    fetchData();
  }, []);

  return (
    <section id="proj-preview">
      <Grid
        direction="column"
        justify="center"
        alignItems="center"
        container
        spacing={2}
      >
        <Grid item lg={12} xs={12} xl={12}>
          <Typography variant="h4" className={`wow fadeIn ${classes.root}`}>
            GitHub Projects
          </Typography>
        </Grid>
        <Grid item md={12} lg={12} xl={12} xs={12}>
          <Typography
            variant="subtitle1"
            className={`wow fadeIn ${classes.root}`}
          >
            All my GitHub repositories, fetched in real time.
          </Typography>
        </Grid>
        <Grid container item justify="center" alignItems="center" spacing={3}>
          {repos.slice(0, 3).map((repo, index) => (
            <Grid
              item
              className="wow fadeIn"
              key={index}
              style={{
                animationDelay: `${index * 100 + 100}ms`,
              }}
            >
              <Paper
                elevation={3}
                style={{
                  width: '300px',
                  maxHeight: '110vh',
                  padding: '15px',
                  background: '#1a1a1a',
                }}
              >
                <Grid direction="column" container spacing={2}>
                  <Grid item>
                    <i>
                      <h5>
                        <a className="text-gray-200" href={repo.url}>
                          {repo.name}
                        </a>
                      </h5>
                    </i>
                  </Grid>
                  <Grid item>
                    <h6 className="text-gray-300">{repo.description}</h6>
                  </Grid>
                  <Grid item>
                    <h6 className="text-gray-300">
                      <LanguageBlob
                        language={repo.language}
                        fontSize="small"
                        style={{ paddingBottom: '3px' }}
                      />{' '}
                      {repo.language}
                      &nbsp;
                      {repo.stars >= 1 && (
                        <span>
                          <GradeIcon
                            style={{
                              paddingBottom: '3px',
                              fontSize: 'large',
                            }}
                          />
                          {repo.stars}
                        </span>
                      )}
                      &nbsp;
                      {repo.forks >= 1 && (
                        <span>
                          <SourceFork
                            style={{ fontSize: '18px', paddingBottom: '3px' }}
                          />
                          {repo.forks}
                        </span>
                      )}
                    </h6>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid item md={12} lg={12} xl={12} xs={12}>
          <Link href="/projects" passHref>
            <Button
              className="wow fadeIn"
              variant="contained"
              color="inherit"
              endIcon={<NavigateNextIcon />}
            >
              See more
            </Button>
          </Link>
        </Grid>
      </Grid>
      <br />
      <br />
    </section>
  );
};

export default GitProjectsPreview;