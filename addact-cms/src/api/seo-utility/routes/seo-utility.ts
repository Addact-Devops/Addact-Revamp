export default {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/seo-utility/gui',
      handler: 'seo-utility.gui',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/seo-utility/types',
      handler: 'seo-utility.getTypes',
    },
    {
      method: 'POST',
      path: '/seo-utility/update',
      handler: 'seo-utility.update',
    },
  ],
};
