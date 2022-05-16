pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000 -v /home:/home:rw,z'
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
              echo "Running ..."
            }
        }
        stage('Deliver') {
            steps {
              sh 'cp -vR ${WORKSPACE}/nuxt-dist/* /home/app/frontend/nuxt-dist/'
            }
        }
    }
}
