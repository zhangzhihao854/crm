import {
	baseUrl
} from './env'
import Vue from 'vue'
// 获取数据接口公共类方法
export default async (type = '', url = '', params = {}, method = 'fetch1') => {
  if (type == 'POST') {
      return new Promise((resolve, reject) => {
        Vue.http.post(
          baseUrl + url,
          {
            params
          },
          {emulateJSON: true}
        )
          .then((res) => {
            resolve(res.body);
          })
          .catch((res) => {
            reject(res.body);
          });
      });
  }
  else {
    return new Promise((resolve, reject) => {
      Vue.http.get(
        baseUrl + url,
        {
          params: params
        },
        {emulateJSON: true}
      )
        .then((res) => {
          resolve(res.body);
        })
        .catch((res) => {
          reject(res.body);
        });
    });
  }
}
