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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';

import './index.css';

const ChartMenuBar = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 10px;
  position: absolute;
  right: 0;
`;

function Home() {
  const [reload, setReload] = React.useState(false);
  const [chartMechanism, setChartMechanism] = React.useState("preloaded");

  const handleReload = () => {
    setReload(true);
    setTimeout(() => { setReload(false) }, 1000);
  };

  const toggleSetChartMechanism = (selection) => {
    if (chartMechanism !== selection) {
      setChartMechanism(selection);
    }
  }

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
            <ChartMenuBar>
              <ToggleButtonGroup
                color="primary"
                value={chartMechanism}
                exclusive
                onChange={(event) => toggleSetChartMechanism(event.target.value)}
                aria-label="Platform"
                sx={{margin: "0px 5px"}}
              >
                <ToggleButton value="preloaded">Preloaded</ToggleButton>
                <ToggleButton value="interpolated">Interpolated</ToggleButton>
              </ToggleButtonGroup>
              <Tooltip title="Reload zoom" placement="bottom">
                <Button variant='outlined' onClick={handleReload}>
                  <RefreshIcon/>
                </Button>
              </Tooltip>
            </ChartMenuBar>
            <ConcentrationChart reload={reload} chartMechanism={chartMechanism}/>
          </Panel>
        </PanelGroup>
    </Box>
  );
}

export default Home;