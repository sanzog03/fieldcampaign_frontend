import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { TopBar } from './topBar';
import { FCXViewer } from '../cesiumViewer';
import { ClippedDrawer } from './drawer';

function Home() {
  const visualizationTypes = ['czml', '3dTile', 'wmts', 'pointPrimitive']
  const [selectedVisualization, setVisualization] = React.useState(visualizationTypes[0]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar/>
      <FCXViewer selectedVisualization={selectedVisualization}/>
      <ClippedDrawer visualizationTypes={visualizationTypes} setVisualization={setVisualization}/>
    </Box>
  );
}
export default Home;