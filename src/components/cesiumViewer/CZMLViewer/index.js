import { Viewer, createWorldImagery, IonWorldImageryStyle, ProviderViewModel, buildModuleUrl, CzmlDataSource,
         HeadingPitchRange, Math, HeadingPitchRoll, Transforms, CallbackProperty, Cartesian3 } from 'cesium';

const impactData = "https://ghrc-fcx-field-campaigns-szg.s3.amazonaws.com/Olympex/instrument-processed-data/nav_er2/olympex_naver2_IWG1_20151109.czml"

export default function CZMLViewer(setCurrentViewer) {
    const viewer = new Viewer("cesiumContainer", {
        shouldAnimate: false,
        useBrowserRecommendedResolution: true,
        selectedImageryProviderViewModel: new ProviderViewModel({
            name: "Bing Maps Aerial with Labels",
            iconUrl: buildModuleUrl("Widgets/Images/ImageryProviders/bingAerialLabels.png"),
            tooltip: "Bing Maps aerial imagery with labels, provided by Cesium ion",
            category: "Cesium ion",
            creationFunction: function () {
              return createWorldImagery({
                style: IonWorldImageryStyle.AERIAL_WITH_LABELS,
              })
            },
          })
    });

    setCurrentViewer(viewer);

    doStuffWithCZML()

    function doStuffWithCZML() {
        CzmlDataSource.load(impactData)
        .then(async (dataSource) => {
            viewer.dataSources.add(dataSource);
            const p3Entity = dataSource.entities.getById("Flight Track");
            
            // a fly to is much better than zoom to.
            // await viewer.flyTo(p3Entity, {offset: new HeadingPitchRange(0, Math.toRadians(-10), 40000)})

            viewer.zoomTo(dataSource,  new HeadingPitchRange(0, Math.toRadians(-10), 40000));
            p3Entity.viewFrom = new Cartesian3(-30000, -70000, 50000);

            // track entity
            viewer.trackedEntity = p3Entity;

            // fix orientation
            p3Entity.orientation = new CallbackProperty((time, _result) => fixOrientation(p3Entity, time), false);

            function fixOrientation(entity, time) {
                const position = entity.position.getValue(time);
                console.log(">>", entity.properties.getValue(time));
                let { heading, pitch, roll, correctionOffsets } = entity.properties.getValue(time);
                // only the heading should change with respect to the position.
                // console.log()
                if(!correctionOffsets) {
                    correctionOffsets = {
                        heading: 0,
                        pitch: 0,
                        roll: 0
                    }
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
        });
    }
}