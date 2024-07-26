import React from 'react';
import Box from '@mui/material/Box';

import { FCXViewer } from '../cesiumViewer';
import { ConcentrationChart } from '../chart';
import { Title } from '../title';

function Home() {
  return (
    <Box 
      display={"flex"}
      flexDirection={"column"}
      className="fullSize">
        <Title/>
        <FCXViewer/>
        <ConcentrationChart/>
    </Box>
  );
}
export default Home;