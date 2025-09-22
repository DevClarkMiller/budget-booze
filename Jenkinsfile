pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Install Dependencies") {
            steps {
                sh 'npm install'
                writeFile file: ".env.development", text:""
                writeFile file: ".env.production", text:""

                dir('backend') {
                    sh 'npm install'

                    withCredentials([file(credentialsId: 'budgetbooze-backend-env', variable: 'ENV_FILE')]) {
                        sh '''
                            echo "Secret file path: $ENV_FILE"
                            cp "$ENV_FILE" .env   # copy into workspace
                            cat .env | grep NODE_ENV || true
                        '''

                        sh 'cat .env'
                    }
                }
            }
        }

        stage("Build") {
            steps {
                sh "npm run build"
                dir('backend') {
                    sh 'npm run build:image'
                    sh 'npm run save:image'
                }
            }
        }

        stage("Deploy") {
            steps {
                echo "DEPLOYING"
            }
        }
    }
}