export const addAuth2Header = (url: string, options: any) => {
  console.log('请求拦截了 在微应用中');
  // url = 'http://localhost:8081'+url;
  let auth_Token = localStorage.getItem('authorization');
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: '*/*',
    authorization: auth_Token,
  };
  return {
    url,
    options: { ...options, headers },
  };
};

// 错误码转义
// (response ) => {

// }

//
