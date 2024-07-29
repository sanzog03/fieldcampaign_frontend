import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import styled from "styled-components";

import { FCXViewer } from '../cesiumViewer';
import { ConcentrationChart } from '../chart';
import { Title } from '../title';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import RefreshIcon from '@mui/icons-material/Refresh';
import Tooltip from '@mui/material/Tooltip';

import './index.css';

const Reload = styled.div`
  display: flex;
  justify-content: right;
`;

function Home() {
  const [reload, setReload] = React.useState(false);
  const handleReload = () => {
    setReload(true);
    setTimeout(() => { setReload(false) }, 1000);
  };

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
          <PanelResizeHandle className='resize-handle'>
            <DragHandleIcon/>
          </PanelResizeHandle>
          <Panel maxSize={75} minSize={40} defaultSize={40} className='panel panel-timeline'>
            <Reload>
              <Tooltip title="Reload zoom" placement="bottom">
                <RefreshIcon sx={{marginRight: "10px"}} onClick={handleReload}/>
              </Tooltip>
            </Reload>
            <ConcentrationChart reload={reload}/>
          </Panel>
        </PanelGroup>
    </Box>
  );
}

export default Home;