import React from 'react';
import Box from '@mui/material/Box';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { FCXViewer } from '../cesiumViewer';
import { ConcentrationChart } from '../chart';
import { Title } from '../title';
import styled from 'styled-components';

function Home() {
  return (
    <Box 
      display={"flex"}
      flexDirection={"column"}
      className="fullSize">
        <Title/>
        <PanelGroup direction='vertical' className='panel-wrapper'>
          <Panel
            maxSize={75}
            className='panel'
          >
            <FCXViewer/>
          </Panel>
          <PanelResizeHandle className='resize-handle' />
          <Panel maxSize={75} minSize={40} defaultSize={40} className='panel panel-timeline'>
            <ConcentrationChart/>
          </Panel>
        </PanelGroup>
    </Box>
  );
}
export default Home;