import { graphql, useStaticQuery, Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

// Blog posts preview on the main page, with the three latest blog posts
const BlogPostsPreview = () => {
  const pageQuery = useStaticQuery(graphql`
      {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            excerpt
            frontmatter {
              date(formatString: "D MMMM YYYY")
              title
              path
            }
          }
        }
      }
    }
  `);

  return (
    <section id="blog-prev">
      <Grid direction="row" justify="center" alignItems="center" container spacing={3}>
      <Grid item lg={12} xs={12} xl={12}>
        <b><h3 className="text-gray-400 text-center wow fadeIn">What am I thinking about?</h3></b>
        </Grid>
        <Grid item md={12} lg={12} xl={12}>
          <p className="text-gray-400 text-center wow fadeIn">
            Below you can see some of my latest blog posts.
            <Link to="/blog"><h6>Press here to see all of them!</h6></Link>
          </p>
        </Grid>
        {pageQuery.allMarkdownRemark.edges.slice(0, 3).map(({ node }, index) => (
          <Grid item
            className="wow fadeIn"
            key={node.frontmatter.title}
            style={{
              animationDelay: `${index * 100 + 100}ms`,
            }}
          >
            <Paper elevation={3} style={{width: '300px', maxHeight: '13vh', padding: '15px', background: '#212121',}}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <h6 className="text-gray-400">
                    <Link to={node.frontmatter.path} className="text-gray-400">
                      <i>{node.frontmatter.title}</i>
                    </Link>
                  </h6>
                  <h6 className="text-gray-600">{node.frontmatter.date}</h6>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          ))}
      </Grid>
      <br/>
      <br/>
    </section>
  );
};

export default BlogPostsPreview;