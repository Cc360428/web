const baseUrl = "http://172.12.10.189:8061";

/**
 * 发送 POST 请求的封装函数
 * @param {string} url - 请求的 URL 地址
 * @param {object} data - 请求体中的数据
 * @param {object} [options] - 可选的请求配置选项
 * @param {string} [options.contentType] - 请求体的 Content-Type，默认为 'application/json'
 * @param {object} [options.headers] - 自定义的请求头
 * @returns {Promise<any>} - 返回一个 Promise，resolve 时为服务器响应的数据
 */
function post(url, data, options = {}) {
  const { contentType = "application/json", headers = {} } = options;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": contentType,
      ...headers,
    },
    body: JSON.stringify(data),
  };

  return fetch(baseUrl + url, requestOptions)
    .then((response) => {
      // 检查响应状态码是否在 200-299 范围内
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((error) => Promise.reject(error));
      }
    })
    .catch((error) => {
      console.error("POST 请求出错:", error);
      throw error;
    });
}

/**
 * 发送 GET 请求的通用方法
 * @param {string} url - 请求的 URL
 * @param {object} [params] - 请求参数
 * @param {object} [headers] - 自定义请求头
 * @returns {Promise<any>} - 返回一个 Promise，resolve 时返回服务器响应的数据
 */
function get(url, params = {}, headers = {}) {
  // 拼接请求 URL 和参数
  let queryString = "";
  if (Object.keys(params).length > 0) {
    queryString = "?" + new URLSearchParams(params).toString();
  }
  const requestUrl = baseUrl + url + queryString;

  // 创建请求配置对象
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  // 发送 GET 请求并返回 Promise
  return fetch(requestUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}


