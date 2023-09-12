module.exports = {
  apps: [
    {
      name: 'gontche_frontend_prod',
      script: 'npm run start',
      watch: true
    },
    {
      name: 'gontche_frontend_dev',
      script: 'npm run dev',
      watch: true
    }
  ]
}
