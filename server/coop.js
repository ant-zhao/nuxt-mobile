import request from './request';

export const AddUserApi = params => {
  return request.get(`/data/partner/add`, params);
};

export const getCodeApi = params => {
  return request.get(`/data/common/getCodesByGroups`, params);
};
