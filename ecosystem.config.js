module.exports = {
  apps: [{
    name: "Api-Gado-user",
    script: "/home/ubuntu/projects/app-do-gado/user/dist/app-init.js",
    instances: 0,
    exec_mode: "cluster",
    env: {
      MONGODB: 'mongodb://user:password@localhost/dbAppGado',
      REDIS_EXPIRE: 100,
      SERVER_PORT: 5000,
      TEST_URL: 'http://localhost',
      FIRST: 1
    }
  }]
}