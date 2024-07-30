import React, { Component } from "react";
import { Ion } from 'cesium';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { initializeCZMLViewer } from './viewers/CZMLViewer';

export class FCXViewer extends Component {
    constructor(props) {
        super(props);
        this.state = { currentViewer: null };
        this.setCurrentViewer = this.setCurrentViewer.bind(this);
        this.implementationHandler = this.implementationHandler.bind(this);
    }

    componentDidMount() {
        Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_DEFAULT_ACCESS_TOKEN;
        this.implementationHandler();
    }

    implementationHandler() {
        // on initial render, after component mount, show default viewer
        // on state change, check which viewer was supposed to be shown
        // remove the previous viewer, and load the new viewer.
        if (this.state.currentViewer) {
            this.state.currentViewer.destroy();
        }
        initializeCZMLViewer(this.setCurrentViewer);
    }

    setCurrentViewer(viewer){
        this.setState({currentViewer: viewer});
    }

    render() {
      return (
        <React.Fragment>
            <Box component="main" className="fullSize" sx={{ flexGrow: 1 }}>
                <Grid container className="fullSize">
                    <Grid item xs={12} sx={{ position: "relative" }}>
                        <div id="cesiumContainer" className="fullSize" style={{ position: "absolute" }}></div>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
      )
    }
}