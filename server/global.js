import { Bsurl } from './url';
export const BASEURL = (() => {
  let BASE_URL = '';
  let host = process.env.HOST;
  switch (host) {
    case 'dev':
      BASE_URL = Bsurl.VUE_APP_API_HOST_LOCAL;
      break;
    case 'org':
      BASE_URL = Bsurl.VUE_APP_API_HOST_ORG;
      break;
    case 'net':
      BASE_URL = Bsurl.VUE_APP_API_HOST_NET;
      break;
    case 'link':
      BASE_URL = Bsurl.VUE_APP_API_HOST_LINK;
      break;
    case 'vip':
      BASE_URL = Bsurl.VUE_APP_API_HOST_VIP;
      break;
    case 'vip':
      BASE_URL = Bsurl.VUE_APP_API_HOST_VIP;
      break;
    default:
      BASE_URL = Bsurl.VUE_APP_API_HOST;
      break;
  }
  return BASE_URL;
})();
