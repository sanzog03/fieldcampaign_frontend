import * as React from 'react';
import Box from '@mui/material/Box';

import { FCXViewer } from '../cesiumViewer';
import { Chart } from '../chart';

function Home() {
  return (
    <Box 
      display={"flex"}
      flexDirection={"column"}
      className="fullsize">
        <FCXViewer className="fullsize"/>
        <Chart className="fullsize"/>
    </Box>
  );
}
export default Home;