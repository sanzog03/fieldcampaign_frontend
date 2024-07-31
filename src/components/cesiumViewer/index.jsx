import React, { Component } from "react";
import { Ion } from 'cesium';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { initializeCZMLViewer } from './viewers/CZMLViewer';
import { MapMenu } from "./menu";

export class FCXViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentViewer: null,
            currentEntity: null,
            trackAircraft: true
        };
        this.setCurrentViewer = this.setCurrentViewer.bind(this);
        this.setTrackAircraft = this.setTrackAircraft.bind(this);
        this.trackEntity = this.trackEntity.bind(this);
        this.implementationHandler = this.implementationHandler.bind(this);
    }

    componentDidMount() {
        Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_DEFAULT_ACCESS_TOKEN;
        this.implementationHandler();
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.trackAircraft !== nextState.trackAircraft) {
            this.trackEntity(nextState);
        }
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

    setTrackAircraft(track) {
        this.setState({trackAircraft: track});
    }

    trackEntity(state) {
        let { trackAircraft } = state;
        // if no current entity instance stored, store it.
        if (!state.currentEntity && state.currentViewer.trackedEntity) {
            this.setState({currentEntity: state.currentViewer.trackedEntity}).then(() => {
                if (trackAircraft && state.currentViewer && state.currentEntity) {
                    state.currentViewer.trackedEntity = state.currentEntity;
                } else if (!trackAircraft && state.currentViewer) {
                    state.currentViewer.trackedEntity = null;
                }
            });
        }
        else if (trackAircraft && state.currentViewer && state.currentEntity) {
            state.currentViewer.trackedEntity = state.currentEntity;
        } else if (!trackAircraft && state.currentViewer) {
            state.currentViewer.trackedEntity = null;
        }
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
            <MapMenu trackAircraft={this.state.trackAircraft} setTrackAircraft={this.setTrackAircraft}/>
        </React.Fragment>
      )
    }
}