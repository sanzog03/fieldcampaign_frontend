import React, { Component } from "react";
import {Ion} from 'cesium';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

import { initializeCZMLViewer } from './CZMLViewer';
import { initialize3DTileViewer } from "./Tiles3DViewer";
import { initializeWMTSViewer } from "./WMTSViewer";
import { initializePointPrimitiveViewer } from "./PointPrimitiveViewer";

import { SubsettingToolExplorer } from "../toolsExplorer/subsettingTool";
import { HistogramToolExplorer } from "../toolsExplorer/histogramTool";

export class FCXViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentViewer: null,
            viewerExplorerToggle: true, // if true show data viewer, else show tool explorer
            toolExpolorer: "subsettingTool",
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
                this.setState({toolExpolorer: "subsettingTool", currentViewer: null}); // reset the viewer; needed for data viewers.
                this.flipViewMode("toolExplorer");
                break;
            case "histogramTool":
                this.setState({toolExpolorer: "histogramTool", currentViewer: null}); // reset the viewer; needed for data viewers.
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
            <Box component="main" sx={{ flexGrow: "initial"}} style={{width: "99%"}}>
                <Toolbar />
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{position: "relative", height: "100%", width: "100%"}}>
                    <Box style={{ display: this.state.viewerExplorerToggle ? "block" : "none", backgroundColor: "green" }}>
                        {/* <div id="cesiumContainer" style={{width: "100rem"}}></div> */}
                        <div id="cesiumContainer" style={{position: "absolute", width: "100%"}}></div>
                    </Box>
                    {   !this.state.viewerExplorerToggle && this.state.toolExpolorer === "subsettingTool" &&
                        (
                            <SubsettingToolExplorer/>
                        )
                    }
                    {   !this.state.viewerExplorerToggle && this.state.toolExpolorer === "histogramTool" &&
                        (
                            <HistogramToolExplorer/>
                        )
                    }
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
      )
    }
}
  