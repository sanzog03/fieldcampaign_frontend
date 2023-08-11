import { PointPrimitiveCollection, Cartesian3,  NearFarScalar, Color } from 'cesium';
import axios from 'axios';
import { DataViewer } from '../utils/dataViewer';

export function initializePointPrimitiveViewer(setCurrentViewer) {
  /**
  * Initialize viewer and load basic point type data that needs plotting of each data points (primitive).
  * @param  {function} setCurrentViewer  A function that takes `viewer` as a parameter. Used to keep track of current viewer for later removal in parent scope.
  */
  const ppViewer = new PointPrimitiveViewer();
  setCurrentViewer(ppViewer.viewer);
  const pointsDataUrl = "https://ghrc-fcx-viz-output.s3.us-west-2.amazonaws.com/fieldcampaign/goesrplt/2017-05-17/iss-lis_points/LISpoints.json"
  ppViewer.loadDataIntoViewer(pointsDataUrl);
}

class PointPrimitiveViewer extends DataViewer {
  async loadDataIntoViewer(pointsDataUrl) {
    let { data: pointData} = await axios.get(pointsDataUrl);
    pointData.forEach(point => {
      const {Lon, Lat, Rad} = point;
      // Create a pointPrimitive collection with two points
      const primitiveCollection = new PointPrimitiveCollection();
      const points = this.viewer.scene.primitives.add(primitiveCollection);

      Lon.forEach((element, index) => {
          let pw = 0.6, fct = 1/15;
          let nFScalar = new NearFarScalar(1.e2, 2, 8.0e6, 0.5);
          points.add({
              // position : new Cartesian3(1.0, 2.0, 3.0),
              position: Cartesian3.fromDegrees(Lon[index], Lat[index]),
              color : this.selectColor(),
              pixel: Math.pow(Rad[index], pw) * fct,
              scaleByDistance: nFScalar
              });
      });
    }); 
  }

  selectColor() {
    let colors = {
        yellow: new Color(1.0, 1.0, 0.4, 1),
        cyan: new Color(0.68, 1.0, 0.55, .6),
        orng: Color.ORANGE.brighten(0.5, new Color())
    }
    let rand = Math.floor(Math.random() * 3);
    switch (rand) {
        case 0:
            return colors.yellow;
        case 1:
            return colors.cyan;
        default:
            return colors.orng;
    }
  }
}