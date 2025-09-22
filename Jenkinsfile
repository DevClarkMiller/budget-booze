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

                dir('src') {
                    echo "Cloning mill-comps"
                    git branch: 'main',
                        url: 'https://github.com/DevClarkMiller/mill-comps.git'
                }

                dir('backend') {
                    withCredentials([file(credentialsId: 'budgetbooze-backend-env', variable: 'ENV_FILE')]) {
                        script {
                            def secretContent = readFile(env.ENV_FILE)
                            writeFile file: '.env', text: secretContent
                        }
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