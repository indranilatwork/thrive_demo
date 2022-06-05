import axios, { Method } from "axios";

// Interface RequestType{

// }

const header = { "content-type": "application/json" }

export const getData = (url: string, method: Method = "get", body?: any, header?: any) => {
  const defaultHeader: any = {
    'Content-Type': 'application/json'
  };
  if (header) {
    for (let key in header) {
      defaultHeader[key] = header[key]
    }
  }
  return axios({
    method: method,
    url: url,
    data: body,
    headers:defaultHeader
  });
}