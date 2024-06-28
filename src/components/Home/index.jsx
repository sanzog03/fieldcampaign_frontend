import * as React from 'react';
import Box from '@mui/material/Box';

import { FCXViewer } from '../cesiumViewer';
import { Chart } from '../chart';
import { Title } from '../title';

function Home() {
  return (
    <Box 
      display={"flex"}
      flexDirection={"column"}
      className="fullSize">
        <Title/>
        <FCXViewer/>
        <Chart/>
    </Box>
  );
}
export default Home;