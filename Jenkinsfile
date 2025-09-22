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
                    dir('src') {
                        git branch: 'main',
                            url: 'https://github.com/DevClarkMiller/mill-comps.git'

                    }

                    withCredentials([file(credentialsId: 'budgetbooze-backend-env', variable: 'ENV_FILE')]) {
                        sh 'cat "$ENV_FILE" > .env'
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