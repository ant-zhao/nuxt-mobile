import axios from 'axios';
import { BASEURL } from './global';
import { Message } from 'element-ui';
let service = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 10000
});

service.defaults.timeout = 15000;

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 返回结果处理
service.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 404:
        case 500:
        case 502:
          console.log('接口异常:' + error.response.status);
          break;
      }
    }
    Message.error({
      message: error
    });
    return Promise.reject(error);
  }
);

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}, option = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
        ...option
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, option = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data, { ...option }).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * delete 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, data = {}, option = {}) {
  return new Promise((resolve, reject) => {
    service.delete(url, { data, ...option }).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}, option = {}) {
  return new Promise((resolve, reject) => {
    service.put(url, data, { ...option }).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * all 并发请求封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function all(arr) {
  const _arr = arr.map((item, i) => {
    if (typeof item === 'string') {
      return service.get(item);
    } else {
      if (item.method) {
        return service[item.method](item.url);
      }
    }
  });
  return new Promise((resolve, reject) => {
    axios
      .all(_arr)
      .then(
        axios.spread(function() {
          const resultArr = [...arguments];
          resolve(resultArr);
        })
      )
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  get,
  post,
  put,
  delete: del,
  all
};
