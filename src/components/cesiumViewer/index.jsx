import React, { Component } from "react";
import {Ion} from 'cesium';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import { initializeCZMLViewer } from './CZMLViewer';
import { initialize3DTileViewer } from "./Tiles3DViewer";
import { initializeWMTSViewer } from "./WMTSViewer";
import { initializePointPrimitiveViewer } from "./PointPrimitiveViewer";

import { SubsettingToolExplorer } from "../toolsExplorer/SubsettingTool";

export class FCXViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentViewer: null,
            viewerExplorerToggle: true, // if true show data viewer, else show tool explorer
        };
        this.implementationHandler = this.implementationHandler.bind(this);
        this.setCurrentViewer = this.setCurrentViewer.bind(this);
        this.flipViewMode = this.flipViewMode.bind(this);
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
                this.flipViewMode("dataViewer");
                initializeCZMLViewer(this.setCurrentViewer);
                break;
            case "3dTile":
                this.flipViewMode("dataViewer");
                initialize3DTileViewer(this.setCurrentViewer);
                break;
            case "wmts":
                this.flipViewMode("dataViewer");
                initializeWMTSViewer(this.setCurrentViewer);
                break;
            case "pointPrimitive":
                this.flipViewMode("dataViewer");
                initializePointPrimitiveViewer(this.setCurrentViewer);
                break;
            case "subsettingTool":
                this.setCurrentViewer(); // reset the viewer; needed for data viewers.
                this.flipViewMode("toolExplorer");
                break;
            default:
                this.flipViewMode("dataViewer");
                initializeCZMLViewer(this.setCurrentViewer); 
        }
    }

    setCurrentViewer(viewer){
        this.setState({currentViewer: viewer});
    }

    flipViewMode(requestView) {
        let currentView = this.state.viewerExplorerToggle ? "dataViewer" : "toolExplorer";
            if (currentView !== requestView) {
                this.setState((prevState) => ({viewerExplorerToggle: !prevState.viewerExplorerToggle}))
            }
    }

    render() {
      return (
        <React.Fragment>
            <Box component="main" sx={{ flexGrow: "initial"}}>
                <Toolbar />
                <Container style={{ display: this.state.viewerExplorerToggle ? "block" : "none" }}>
                    <div id="cesiumContainer" style={{width: "100%", height:"100%"}}></div>
                </Container>
                {   !this.state.viewerExplorerToggle &&
                    (
                        <SubsettingToolExplorer/>
                    )
                }
            </Box>
        </React.Fragment>
      )
    }
}
  