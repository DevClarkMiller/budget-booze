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

        stage("Install Dependencies Frontend") {
            when { changeset "src/**" }
            steps {
                sh 'npm install'
                writeFile file: ".env.development", text:""
                writeFile file: ".env.production", text:""

                dir('src/mill-comps') {
                    git(
                        branch: 'main',
                        url: 'https://github.com/DevClarkMiller/mill-comps.git',
                        changelog: false,
                        poll: false
                    )
                }
            }
        }

        stage("Install Dependencies Backend") {
            when { changeset "backend/**" }
            steps {
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

        stage ("Build Frontend") {
            when { changeset "src/**" }
            steps {
                sh "npm run build"
            }
        }
        stage("Build Backend") {
            when { changeset "backend/**" }
            steps {
                dir('backend') {
                    sh 'npm run build:image'
                    sh 'npm run save:image'
                }
            }
        }

        stage("Deploy Frontend") {
            when { changeset "src/**" }
            steps {
                sh 'scp -r build/* clark@clarkmiller.ca:/var/www/budgetbooze.ca/html'
            }
        }

        stage("Deploy Backend") {
            when { changeset "backend/**" }
            steps {
                sh 'scp backend/budgetboozeimage.tar miller@sys1.clarkmiller.ca:/home/miller'
                sh 'ssh sys1.clarkmiller.ca "docker load -i budgetboozeimage.tar"'
                sh 'ssh sys1.clarkmiller.ca "docker compose stop budgetbooze ; docker compose rm -f budgetbooze; docker compose up -d budgetbooze"'
            }
        }
    }
}