// export const BASEURL = 'http://localhost:8081/goods';
export const BASEURL =
  process.env.NODE_ENV == 'production'
    ? 'http://localhost:8081'
    : 'http://localhost:8081';
