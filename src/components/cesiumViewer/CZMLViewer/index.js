import { CzmlDataSource, HeadingPitchRange, Math, HeadingPitchRoll,
         Transforms, CallbackProperty, Cartesian3, JulianDate, Ellipsoid } from 'cesium';
import { store } from "../../../store"; 
import { updateData } from "../cesiumViewerSlice";
import { DataViewer } from '../utils/dataViewer';
import noaaczml from '../../../assets/data/nav_czml.czml';

export function initializeCZMLViewer(setCurrentViewer) {
    /**
     * Initialize viewer and load CZML type data.
     * @param  {function} setCurrentViewer  A function that takes `viewer` as a parameter. Used to keep track of current viewer for later removal in parent scope.
     */
    const czmlViewer = new CZMLViewer();
    setCurrentViewer(czmlViewer.viewer);
    const czmlDataUrl = noaaczml
    czmlViewer.loadDataIntoViewer(czmlDataUrl);
}

class CZMLViewer extends DataViewer {
    loadDataIntoViewer(czmlDataUrl) {
        CzmlDataSource.load(czmlDataUrl)
        .then(async (dataSource) => {
            this.viewer.dataSources.add(dataSource);
            // zoom to entity
            this.viewer.zoomTo(dataSource,  new HeadingPitchRange(0, Math.toRadians(-10), 40000));

            // only apply to czml for flight entities
            const flightEntity = dataSource.entities.getById("Flight Track");
            if (flightEntity) {
                flightEntity.viewFrom = new Cartesian3(-30000, -70000, 50000);
                // track entity
                this.viewer.trackedEntity = flightEntity;
                // fix orientation
                let previousTime = null;

                flightEntity.orientation = new CallbackProperty((time, _result) => fixOrientation(flightEntity, time), false);

                function fixOrientation(entity, time) {
                    const position = entity.position.getValue(time);

                    var carto = Ellipsoid.WGS84.cartesianToCartographic(position);
                    // var altitude = Math.toDegrees(carto.height);
                    var altitude = carto.height;

                    let { heading, pitch, roll, co2, ch4, correctionOffsets } = entity.properties.getValue(time);
                    // only the heading should change with respect to the position.
                    if(!correctionOffsets) {
                        correctionOffsets = {
                            heading: 0,
                            pitch: 0,
                            roll: 0
                        }
                    }

                    let formattedDateTime = JulianDate.toIso8601(time);

                    // only on time change.
                    if (previousTime !== formattedDateTime) {
                        store.dispatch(updateData({
                            datetime: formattedDateTime,
                            altitude: altitude,
                            value: co2
                        }))
                        previousTime = formattedDateTime;
                    }

                    // fix the pitch and roll rotations
                    heading = heading + Math.toRadians(correctionOffsets.heading);
                    pitch = pitch + Math.toRadians(correctionOffsets.pitch);
                    roll = roll + Math.toRadians(correctionOffsets.roll);
                    const hpr = new HeadingPitchRoll(heading, pitch, roll);
                    const fixedOrientation = Transforms.headingPitchRollQuaternion(
                        position,
                        hpr
                    );
                    return fixedOrientation;
                }
            }
        });
    }
}