module.exports = {
  apps: [
    {
      name: 'gontche_frontend_prod',
      script: 'npm run start',
      watch: ['nuxt-dist']
    },
    {
      name: 'gontche_frontend_dev',
      script: 'npm run dev',
      watch: ['nuxt-dist']
    }
  ]
}
