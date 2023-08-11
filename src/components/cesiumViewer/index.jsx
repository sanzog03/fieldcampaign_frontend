import React, { Component } from "react";
import {Ion} from 'cesium';
import { initializeCZMLViewer } from './CZMLViewer';
import { initialize3DTileViewer } from "./Tiles3DViewer";
import { initializeWMTSViewer } from "./WMTSViewer";

class FCXViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentlyShowing: "czml",
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

    implementationHandler() {
        // on initial render, after component mount, show default viewer
        // on state change, check which viewer was supposed to be shown
        // remove the previous viewer, and load the new viewer.
        if (this.state.currentViewer) {
            this.state.currentViewer.destroy();
        }
        switch(this.state.currentlyShowing) {
            case "czml":
                initializeCZMLViewer(this.setCurrentViewer);
                break;
            case "3dTile":
                initialize3DTileViewer(this.setCurrentViewer);
                break;
            case "wmts":
                initializeWMTSViewer(this.setCurrentViewer);
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
        <div>
            <div id="cesiumContainer" style={{width: "100%", height: "100%"}}></div>
            <div id="customSelectionTool">
            <table>
                <tbody>
                    <tr>
                        <td>Implementations</td>
                        <td>
                        <select id="cesiumImplementations" name="cesiumImplementations" value={this.state.currentlyShowing} onChange={this.handleSelectionChange}>
                            <option value="czml">CZML flight Path Tracking</option>
                            <option value="3dTile">3dTile PointClouds</option>
                            <option value="wmts">WMTS Imagery</option>
                        </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
      )
    }
}
  
export default FCXViewer;
  