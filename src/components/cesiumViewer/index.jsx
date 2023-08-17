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
            dataViewer: false,
            toolExplorer: true
        };
        this.implementationHandler = this.implementationHandler.bind(this);
        this.setCurrentViewer = this.setCurrentViewer.bind(this);
    }

    componentDidMount() {
        Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_DEFAULT_ACCESS_TOKEN;
        if (this.state.dataViewer) this.implementationHandler();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedVisualization !== prevProps.selectedVisualization && this.state.dataViewer) {
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
                this.flipViewMode("dataViewer");
                break;
            default:
                this.flipViewMode("toolExplorer");
                initializeCZMLViewer(this.setCurrentViewer); 
        }
    }

    setCurrentViewer(viewer){
        this.setState({currentViewer: viewer});
    }

    flipViewMode(requestView) {
        let currentView = this.state.dataViewer ? "dataViewer" : "toolExplorer";
        if (currentView !== requestView) {
            this.setState((prevState) => ({dataViewer: !prevState.dataViewer, toolExplorer: !prevState.toolExplorer}))
        }
    }

    render() {
      return (
        <React.Fragment>
            <Box component="main" sx={{ flexGrow: "initial"}}>
                <Toolbar />
                {
                 this.state.dataViewer && (
                        <Container>
                            <div id="cesiumContainer" style={{width: "100%", height:"100%"}}></div>
                        </Container>
                    )
                }
                {
                    this.state.toolExplorer && (
                        <SubsettingToolExplorer/>
                    )
                }
            </Box>
        </React.Fragment>
      )
    }
}
  