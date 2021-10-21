import { Bsurl } from "./url";

let baseUrl= "",uploadImageAction="",filePath="" ; //默认的url
if(process.browser) {
    switch (process.env.HOST) {
        case 'dev':  // 本地环境
            baseUrl = Bsurl.VUE_APP_API_HOST_LOCAL;
            uploadImageAction = `${Bsurl.VUE_APP_API_HOST_LOCAL}/sentences/file/uploadFile`;
            filePath = `${Bsurl.VUE_APP_API_HOST_LOCAL}/sentences/image`;
            break;
        case 'org':  //测试环境
            baseUrl = Bsurl.VUE_APP_API_HOST_ORG;
            uploadImageAction = `${Bsurl.VUE_APP_API_HOST_ORG}/sentences/file/uploadFile`;
            filePath = `${Bsurl.VUE_APP_API_HOST_ORG}/sentences/image`;
        default:
            baseUrl = Bsurl.VUE_APP_API_HOST;
            uploadImageAction = `${Bsurl.VUE_APP_API_HOST}/sentences/file/uploadFile`;
            filePath = `${Bsurl.VUE_APP_API_HOST_SERVER}/sentences/image`;
            break;
    }
} else {
    baseUrl = Bsurl.VUE_APP_API_HOST_SERVER;
    uploadImageAction = `${Bsurl.VUE_APP_API_HOST_SERVER}/sentences/file/uploadFile`;
    filePath = `${Bsurl.VUE_APP_API_HOST_SERVER}/sentences/image`;
}

export default { baseUrl, uploadImageAction, filePath };