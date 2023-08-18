import Jsona from 'jsona';
import { APICall } from '../../utils/apiCaller';

import {requestBodyFEGS} from "./helper/handleFEGSdata";
import {requestBodyLIP} from "./helper/handleLIPdata";
import {requestBodyCRS, requestBodyCRSparams} from "./helper/handleCRSdata";
import {requestBodyCPL, requestBodyCPLparams} from "./helper/handleCPLdata";

export function apiCall(instrumentType="FEGS") {
  // env vars
  let url = "https://6lnw7mfi9f.execute-api.us-east-1.amazonaws.com/development/fcx-histogram-preprocessing";
  const apiKey = "TOl3gUuA7n80coKZAqsAP1b2rZx9SWSb6AQwxaBk"
  // generate token id and body, necessary for subsetting backend
  let body = bodyForPost(instrumentType);
  
  const apiCaller = new APICall();
  const dataFormatter = new Jsona();

  apiCaller.setHeader(apiKey);

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

function bodyForPost(instrumentType="FEGS") {
  /**
     * Take in Instrument Type.
     * return the request body
     */
  if (instrumentType === "FEGS") {
      return requestBodyFEGS();
  } else if (instrumentType === "LIP") {
      return requestBodyLIP();
  } else if (instrumentType === "CRS") {
      // call to get params and then use that to create body
      // currently handled in requestBodyCRS as a predefined formal paramter
      // let params = requestBodyCRSparams(date);
      return requestBodyCRS();
  } else if (instrumentType === "CPL") {
      // call to get params and then use that to create body
      // currently handled in requestBodyCPL as a predefined formal paramter
      // let params = requestBodyCPLparams(date);
      return requestBodyCPL();
  }
}