import request from './request';

//注册
export const registerApi = params => {
  return request.post(`/office/user/register`, params);
};

export const getResCodeApi = params => {
  return request.post(`/office/user/registerCheckCode`, params);
};

//登录
export const loginApi = params => {
  return request.post(`/office/user/login`, params);
};

export const getLogCodeApi = params => {
  return request.get(`/office/user/loginCheckCode`, params);
};

export const logOutApi = params => {
  return request.get(`/office/user/logout`, params);
};
