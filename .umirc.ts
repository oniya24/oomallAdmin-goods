import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8081/goods/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  qiankun: {
    slave: {},
  },
  fastRefresh: {},
});
