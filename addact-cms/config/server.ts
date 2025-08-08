export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1339),
  url:env('PUBLIC_URL','https://uatcms.addact.net:9443'),
  proxy:true,
  admin:{
    url:'/admin',
    autoOpen:true,
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
});
