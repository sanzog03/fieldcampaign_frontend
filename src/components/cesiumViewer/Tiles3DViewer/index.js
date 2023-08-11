import { Cesium3DTileset, Cesium3DTileStyle, JulianDate } from 'cesium';
import { DataViewer } from '../utils/dataViewer';

import * as Cesium from 'cesium';
import { extendCesium3DTileset } from 'temporal-3d-tile';
const Temporal3DTileset = extendCesium3DTileset(Cesium);


export function initialize3DTileViewer(setCurrentViewer) {
  /**
  * Initialize viewer and load 3DTile Pointclouds type data.
  * @param  {function} setCurrentViewer  A function that takes `viewer` as a parameter. Used to keep track of current viewer for later removal in parent scope.
  */
  const tile3dViewer = new Tile3DViewer();
  setCurrentViewer(tile3dViewer.viewer);
  const tile3dDataUrl = "https://ghrc-fcx-field-campaigns-szg.s3.amazonaws.com/Olympex/instrument-processed-data/crs/20151110/tileset.json"
  tile3dViewer.loadDataIntoViewer(tile3dDataUrl);
}

class Tile3DViewer extends DataViewer {
  loadDataIntoViewer(tiles3dDataUrl) {
    const tileset = new Cesium3DTileset({ // use this to see spatial data
    // const tileset = new Temporal3DTileset({ // use this to see spatial data in temporal fashion
      url: tiles3dDataUrl
    });

    tileset.style = new Cesium3DTileStyle({
        color: this.getColorExpression(),
        pointSize: 5.0
      });

    var currentTime = JulianDate.fromIso8601("2015-11-10T17:54:00Z")
    var endTime = JulianDate.fromIso8601("2015-11-10T23:59:00Z");

    this.viewer.clock.currentTime = currentTime;
    this.viewer.clock.multiplier = 10;

    // add the tileset to viewer.
    this.viewer.scene.primitives.add(tileset);

    this.viewer.timeline.zoomTo(currentTime, endTime);
    this.viewer.zoomTo(tileset);
  }

  getColorExpression() {
    // helper to generate color expression,
    //  to style the tileset refer. tilset styling in cesium docs for more info on styling expressions. 
      let reverse = true
      let ascale = 4.346
      let vmin = -10
      let vmax = 30
      let vrange = vmax - vmin
      let hmin = 0.438
      let hrange = 1

      let revScale = ""
      if (reverse) {
          revScale = " * -1.0 + 1.0"
      }
      return `hsla((((clamp(\${value}, ${vmin}, ${vmax}) + ${vmin}) / ${vrange}) ${revScale}) * ${hrange} + ${hmin}, 1.0, 0.5, pow((\${value} - ${vmin})/${vrange}, ${ascale}))`
  }
}