import { ImageryLayer, WebMapTileServiceImageryProvider, JulianDate, TimeIntervalCollection } from 'cesium';
import { DataViewer } from '../utils/dataViewer';

export function initializeWMTSViewer(setCurrentViewer) {
  /**
  * Initialize viewer and load WMTS type data.
  * @param  {function} setCurrentViewer  A function that takes `viewer` as a parameter. Used to keep track of current viewer for later removal in parent scope.
  */
  const wmtsViewer = new WMTSViewer();
  setCurrentViewer(wmtsViewer.viewer);
  const wmtsDataUrl = "https://q6eymnfsd9.execute-api.us-west-2.amazonaws.com/development/singleband/C13/{Time}/{TileMatrix}/{TileCol}/{TileRow}.png?colormap=cloud"
  wmtsViewer.loadDataIntoViewer(wmtsDataUrl);
}

class WMTSViewer extends DataViewer {
  loadDataIntoViewer(wmtsDataUrl) {
    let times = [ "548258538", "548258838", "548259138", "548259438", "548259738", "548260038", "548260338", "548260638", "548260938", "548261238", "548261538", "548261838", "548262138", "548262438", "548262738", "548263038", "548263338", "548263638", "548263938", "548264238", "548264538", "548264838", "548265138", "548265438", "548265738", "548266038", "548266338", "548266638", "548266938", "548267238", "548267538", "548267838", "548268138", "548268438", "548268738", "548269038", "548269338", "548269638", "548269938", "548270238", "548270538", "548270838", "548271138", "548271438", "548271738", "548272038", "548272338", "548272638", "548272938", "548273238", "548273538", "548273838", "548274138", "548274438", "548274738", "548275038", "548275338", "548275638", "548275938", "548276238", "548276538", "548276838", "548277138", "548277438", "548277738", "548278038", "548278338", "548278638", "548278938", "548279238", "548279538", "548279838" ]

    let imageryProvider = new WebMapTileServiceImageryProvider({
      url: wmtsDataUrl,
      format: "image/png",
      style: "default",
      times: this.getWrappedTimeIntervalCollection(times),
      tileMatrixSetID: "2km",
      layer: "ABI_Channel_13",
      clock: this.viewer.clock,
    });

    let imageLayer = new ImageryLayer(imageryProvider);
    this.viewer.imageryLayers.add(imageLayer);

    const startDate =   JulianDate.fromIso8601("2017-05-17T02:07:13Z"); // times array start and end in Julian date format.
    const endDate =     JulianDate.fromIso8601("2017-05-17T07:52:13Z");
    this.viewer.timeline.zoomTo(startDate, endDate);

    this.viewer.clock.startTime = startDate;
    this.viewer.clock.stopTime = endDate;
    this.viewer.clock.currentTime = startDate;
  }

  getWrappedTimeIntervalCollection(rawTimes) {
    /**
     * From a input array of raw times
     * Return an array output of time interval collection
     */

    // mapping the time offsets into julian date format. Required for Time interval collection.
    const dates = rawTimes.map((time) => {
      const resultTimeStandard = new JulianDate()
      return JulianDate.addSeconds(JulianDate.fromIso8601("2000-01-01T12:00:00Z"), Number(time), resultTimeStandard);
    });

    const timeIntervalCollection = TimeIntervalCollection.fromJulianDateArray({
        julianDates: dates, // need the julian dates to be in julian format (offsets not allowed)
        dataCallback: (_interval, index) => {
            /**
             * The url format for the WMTS data is as follows:
             *  https://q6eymnfsd9.execute-api.us-west-2.amazonaws.com/development/singleband/C13/${Time}/${TileMatrix}/${TileCol}/${TileRow}.png?colormap=cloud
             * Example:
             *  https://q6eymnfsd9.execute-api.us-west-2.amazonaws.com/development/singleband/C13/ 548258838 /   8     /    56     /    103   .png?colormap=cloud
             */
            /**
             * The `time` in this wmts url accepts only the seconds offset (from 2000-01-01).
             * So, instead of sending the time in Julian format (which would invalidate the url request)
             * Send the second offset in the place of time
             * in time interval collection.
             */
            return {
              Time: rawTimes[index],
            };
        },
    });
    return timeIntervalCollection;
  }
}