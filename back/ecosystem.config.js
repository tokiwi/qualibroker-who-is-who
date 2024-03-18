module.exports = {
  apps : [{
      name : "directus",
      instances : "1",
      exec_mode : "cluster",
      script : "./node_modules/@directus/api/dist/start.js",
      autorestart : false,
      watch: false,
      max_memory_restart: "2G"
  }]
}