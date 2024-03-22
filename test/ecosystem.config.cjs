module.exports = {
  apps: [
    {
      name: 'test',
      port: '4003',
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs'
    }
  ]
}
