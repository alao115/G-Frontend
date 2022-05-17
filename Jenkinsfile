pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Setup environmnet') {
            steps {
                sh 'cp /home/app/frontend/.env ${WORKSPACE}'
            }
        }
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
              sh 'npm run generate'
            }
        }
    }
}
