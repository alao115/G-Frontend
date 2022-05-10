pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000 -v /home/app/frontend:/home/app/frontend:rw -u root'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install yarn'
                sh 'yarn install'
            }
        }
        stage('Build') {
            steps {
              sh 'npm run build'
            }
        }
        stage('Run') {
            steps {
              sh 'npm run start'
            }
        }
        stage('Deliver') {
            steps {
              sh 'cp -r ${WORKSPACE}/nuxt-dist/.* /home/app/frontend/nuxt-dist/'
            }
        }
    }
}
