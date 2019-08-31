import request from './request';

export const getTdkApi = () => {
  return request.get(`/office/systemConfig/getBaseParameterInfo`);
};

export const checkLogApi = () => {
  return request.get(`/office/user/submit`, {});
};

export const advertApi = params => {
  return request.get(`/office/advertisement/advertisementThrow`, params);
};
