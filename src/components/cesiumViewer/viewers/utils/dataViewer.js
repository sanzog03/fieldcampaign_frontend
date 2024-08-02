import { Viewer, createWorldImagery, IonWorldImageryStyle, ProviderViewModel, buildModuleUrl } from 'cesium';


/**
 * Abstract Class DataViewer.
 *
 * @class DataViewer
 */
export class DataViewer {

  constructor() {
    if (this.constructor == DataViewer) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.viewer = null;
    this.initializeViewer();
  }

  initializeViewer() {
    this.viewer = new Viewer("cesiumContainer", {
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
  }

  loadDataIntoViewer() {
    // load data using cesium data sources and add to viewer.
    console.log("loading data into viewer.")
  }
}