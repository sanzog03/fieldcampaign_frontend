import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function TopBar() {
    /**
   * A custom TopBar component that displays a Topbar with Title/Logo of the page.
   * @returns {JSX.Element} TopBar component
   *
   */
  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 3,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              FCX Playground
            </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}