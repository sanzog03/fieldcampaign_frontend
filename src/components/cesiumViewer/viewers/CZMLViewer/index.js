import { CzmlDataSource, HeadingPitchRange, Math, Cartesian3, JulianDate, Ellipsoid,
         VelocityOrientationProperty, PointPrimitiveCollection, PolylineGlowMaterialProperty, Color } from 'cesium';
import { store } from "../../../../store"; 
import { updateData } from "../../cesiumViewerSlice";
import { DataViewer } from '../utils/dataViewer';
import noaaczml from '../../../../assets/data/nav_czml.czml';

let previousTime = null;

export function initializeCZMLViewer(setCurrentViewer) {
    /**
     * Initialize viewer and load CZML type data.
     * @param  {function} setCurrentViewer  A function that takes `viewer` as a parameter. Used to keep track of current viewer for later removal in parent scope.
     */
    const czmlViewer = new CZMLViewer();
    const czmlDataUrl = noaaczml
    czmlViewer.loadDataIntoViewer(czmlDataUrl);
    setCurrentViewer(czmlViewer.viewer);
}

class CZMLViewer extends DataViewer {
    constructor() {
        super();
        this.flightEntity = null;
        this.points = null;
        this.concentrationThreshold = 420; //ppm
    }

    loadDataIntoViewer(czmlDataUrl) {
        CzmlDataSource.load(czmlDataUrl)
        .then(async (dataSource) => {
            this.viewer.dataSources.add(dataSource);
            // zoom to entity
            this.viewer.zoomTo(dataSource,  new HeadingPitchRange(0, Math.toRadians(-10), 40000));
            // this.viewer.clock.multiplier = 60;

            // only apply to czml for flight entities
            const flightEntity = dataSource.entities.getById("Flight Track");
            if (flightEntity) {
                // // Experimental feature to fade out path:
                // flightEntity.path = {
                //     show : true,
                //     leadTime : 0
                //     trailTime : 60000000,
                //     width : 10,
                //     resolution : 1,
                //     material : new PolylineGlowMaterialProperty({
                //         glowPower : 0.8,
                //         taperPower : 0.1,
                //         color : Color.PALEGOLDENROD
                //     })
                // }

                // set orientation: by evaluating to a Quaternion rotation based on the velocity of the provided PositionProperty.
                flightEntity.orientation = new VelocityOrientationProperty(flightEntity.position);
                // set camera
                flightEntity.viewFrom = new Cartesian3(-30000, -70000, 50000);
                // track entity
                this.viewer.trackedEntity = flightEntity;
                // update data and clock information in redux, to be used by chart
                this.viewer.clock.onTick.addEventListener((clock) => this.updateConcentrationData(flightEntity, clock.currentTime));
                // add point primitives to the viewer scene
                let scene = this.viewer.scene;
                this.points = scene.primitives.add(new PointPrimitiveCollection());
                console.log("@@@@@@@", this.points)
            }
        });
    }

    updateConcentrationData(entity, time) {
        const position = entity.position.getValue(time);

        var carto = Ellipsoid.WGS84.cartesianToCartographic(position);
        var altitude = carto.height;

        let { co2 } = entity.properties.getValue(time);

        if ( Number(co2) >= this.concentrationThreshold && this.points) {
            // show red blobs point primitives in the map
            this.points.add({
                position: position,
                color: Color.RED,
                pixelSize: 20
            })
        }

        // only on time change.
        if (previousTime !== time) {
            let formattedDateTime = JulianDate.toIso8601(time);

            store.dispatch(updateData({
                datetime: formattedDateTime,
                altitude: parseFloat(altitude.toFixed(2)),
                value: parseFloat(co2.toFixed(2))
            }))
            previousTime = time;
        }
    }
}