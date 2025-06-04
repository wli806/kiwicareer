module.exports = {
  apps: [
    {
      name: 'jobi',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
      },
    }
  ],
};