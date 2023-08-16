import React, { Component } from "react";
import {Ion} from 'cesium';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { initializeCZMLViewer } from './CZMLViewer';
import { initialize3DTileViewer } from "./Tiles3DViewer";
import { initializeWMTSViewer } from "./WMTSViewer";
import { initializePointPrimitiveViewer } from "./PointPrimitiveViewer";

export class FCXViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentViewer: null
        };
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.implementationHandler = this.implementationHandler.bind(this);
        this.setCurrentViewer = this.setCurrentViewer.bind(this);
    }

    componentDidMount() {
        Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_DEFAULT_ACCESS_TOKEN;
        this.implementationHandler();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedVisualization !== prevProps.selectedVisualization) {
            this.implementationHandler();
        }
    }

    implementationHandler() {
        // on initial render, after component mount, show default viewer
        // on state change, check which viewer was supposed to be shown
        // remove the previous viewer, and load the new viewer.
        if (this.state.currentViewer) {
            this.state.currentViewer.destroy();
        }
        switch(this.props.selectedVisualization) {
            case "czml":
                initializeCZMLViewer(this.setCurrentViewer);
                break;
            case "3dTile":
                initialize3DTileViewer(this.setCurrentViewer);
                break;
            case "wmts":
                initializeWMTSViewer(this.setCurrentViewer);
                break;
            case "pointPrimitive":
                initializePointPrimitiveViewer(this.setCurrentViewer);
                break;
            default:
                initializeCZMLViewer(this.setCurrentViewer); 
        }
    }

    handleSelectionChange(event) {
        this.setState({currentlyShowing: event.target.value}, () => {
            this.implementationHandler();
        });
    }

    setCurrentViewer(viewer){
        this.setState({currentViewer: viewer});
    }

    render() {
      return (
        <React.Fragment>
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <Toolbar />
                <Container>
                    <Box id="cesiumContainer" style={{width: "100%", height: "100%"}}></Box>
                </Container>
            </Box>
        </React.Fragment>
      )
    }
}
  