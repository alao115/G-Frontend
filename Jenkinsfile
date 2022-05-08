pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm -g install yarn'
                sh 'yarn install'
            }
        }
        stage('Build') {
            steps {
              sh 'npm run build'
            }
        }
        stage('Deliver') {
            steps {
              sh 'cp -r ${WORKSPACE}/.* /home/app/frontend'
            }
        }

        stage('Run') {
            steps {
              sh 'pm2 stop gontche_frontend_prod'
              sh 'pm2 start gontche_frontend_prod'
              sh 'pm2 save'
            }
        }
    }
}
