pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') {
            steps {
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
