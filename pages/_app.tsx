import '@css/style.css';
import '@css/animate.css';

import Layout from '@components/Layout';
import SEO from '@components/SEO';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';

// Style override for site-wide font family
// MUI Typography needs this, otherwise it will default to Roboto
const custTheme = createMuiTheme({
  typography: {
    fontFamily: `"Ubuntu", "Roboto", "Arial", sans-serif`,
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <MuiThemeProvider theme={custTheme}>
      <SEO title="Home" />
      {isMounted && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </MuiThemeProvider>
  );
};

export default MyApp;
