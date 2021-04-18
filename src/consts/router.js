// export const BASEURL = 'http://localhost:8081/goods';
export const BASEURL =
  process.env.NODE_ENV == 'production'
    ? 'http://47.96.155.159:8081'
    : 'http://47.96.155.159:8081';
