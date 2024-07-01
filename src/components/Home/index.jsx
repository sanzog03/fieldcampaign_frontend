import React from 'react';
import Box from '@mui/material/Box';

import { FCXViewer } from '../cesiumViewer';
import { ConcentrationChart } from '../chart';
import { Title } from '../title';
import { ViewerChartWrapper } from '../viewerChart';

function Home() {
  return (
    <Box 
      display={"flex"}
      flexDirection={"column"}
      className="fullSize">
        <Title/>
        <ViewerChartWrapper>
          <FCXViewer/>
          <ConcentrationChart/>
        </ViewerChartWrapper>
    </Box>
  );
}
export default Home;