import qs from "qs";
import * as auth from 'auth-provider';
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string,
  data?: object
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json': '' 
    },
    // customConfig 里面的值会覆盖前面的值，所以 method 可能为 POST 等
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config).then(
    async response => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({message: '请重新登陆'})
      }
      // response 只是一个 HTTP 响应，而不是真的 JSON
      // 为了获取 JSON 的内容，需要使用 json() 方法
      //（该方法返回一个将响应 body 解析成 JSON 的 promise）
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        // fetch 捕捉不到异常，所以需要抛出异常（axios 则可以捕捉到异常）
        return Promise.reject(data);
      }
    }
  )
}

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token });
}