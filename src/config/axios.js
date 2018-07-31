import {
	baseUrl
} from './env'
import axios from 'axios'
// 获取数据接口公共类方法

export default async (type = "", url = '', params = {}, method = 'fetch') => {

  if (type == 'POST') {
      return new Promise((resolve, reject) => {
        axios.post(
          baseUrl + url,
          JSON.stringify(params)
        )
          .then((res) => {
            resolve(res.data);
          })
          .catch((res) => {
            reject(res.data);
          });
      });
  }
  else {
    return new Promise((resolve, reject) => {
      axios.get(
        baseUrl + url,
        {
          params: params
        },
        {emulateJSON: true}
      )
        .then((res) => {
          resolve(res.data);
        })
        .catch((res) => {
          reject(res.data);
        });
    });
  }
}
