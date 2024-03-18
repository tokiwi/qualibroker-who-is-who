module.exports = {
  apps: [
    {
      name: 'Meet',
      port: '4000',
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs'
    }
  ]
}