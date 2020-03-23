module.exports = {
  apps : [{
    name: 'covid',
    exec_mode : 'cluster',
    instances: 0,
    cwd: '/root/website/covid19',
    script: '/usr/bin/yarn start',
  }]
}
