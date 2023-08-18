import Jsona from 'jsona';
import moment from "moment/moment"
import {v4 as uuidv4} from 'uuid';
import { APICall } from '../../utils/apiCaller';

export function apiCall(start, end) {
  // env vars
  let url = "https://av45qqv9je.execute-api.us-east-1.amazonaws.com/development/fcx-subsetting-trigger";
  const outputSubsetsBucket = "ghrc-fcx-subset-output"
  const subsettingApiKey = "WMWmmQeEpU9PhSNMgqLer4VlHRdCFUrV9YACJPZd"
  // generate token id and body, necessary for subsetting backend
  let wsTokenId = tokenGenerator();
  let body = bodyForPost(start, end, wsTokenId, outputSubsetsBucket);
  
  const apiCaller = new APICall();
  const dataFormatter = new Jsona();

  apiCaller.setHeader(subsettingApiKey);

  return new Promise((resolve, reject) => {
    apiCaller.post(url, body)
    .then(res => {
      let jsonApiSpecificationData = res.data;
      let deserializedData = dataFormatter.deserialize(jsonApiSpecificationData);
      resolve(deserializedData);
    })
    .catch(err => reject(err)
    );
  });
}

// local utils

function bodyForPost(start, end, wsTokenId, outputSubsetsBucket) {
  /**
     * Take in start and end datetime.
     * generate a random 'dir2' (inside subset dir inside bucket)
     */
  const dataFormatter = new Jsona();
  const date = start ? moment(start).utc().format('YYYY-MM-DD') : "";
  const startDateTime = start ? moment(start).utc().format('YYYY-MM-DD HH:mm:ss') + " UTC" : "";
  const endDateTime = end ? moment(end).utc().format('YYYY-MM-DD HH:mm:ss') + " UTC" : "";
  const outputbucket = outputSubsetsBucket;
  const dir1 = "subsets";
  const dir2 = `subset-${wsTokenId}`; // unique dir, where subsets sits
  const body =  {
      "type": "subset_trigger_request",
      "subDir": `https://${outputbucket}.s3.amazonaws.com/${dir1}/${dir2}/`,
      "date": date,
      "Start": startDateTime,
      "End": endDateTime,
      "wsTokenId": wsTokenId
  }
  const serializedPost = dataFormatter.serialize({stuff: body});
  return serializedPost;
}

const tokenGenerator = () => `${moment().format("YYMMDDHHmmss")}-${uuidv4()}`;