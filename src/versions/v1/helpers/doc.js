const swagger = require('express-jsdoc-swagger');

module.exports = (server) => {
  swagger(server)({
    info: { version: '1.0.0', title: 'Budged tracker' },
    baseDir: __dirname,
    filesPattern: '../routers/*.js',
    swaggerUIPath: '/docs',

    security: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  });
};
