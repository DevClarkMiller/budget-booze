@Library('pipeline-lib') _

pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    parameters {
        booleanParam(
            name: 'FORCE_FRONTEND',
            defaultValue: false,
            description: 'Force frontend stage to run even if no changes detected'
        )
        booleanParam(
            name: 'FORCE_BACKEND',
            defaultValue: false,
            description: 'Force backend stage to run even if no changes detected'
        )
    }

    stages {

        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Install Dependencies Frontend") {
            when { 
                anyOf {
                    changeset "src/**"
                    changeset "package.json"
                    changeset "package-lock.json"
                    changeset "Jenkinsfile"
                    expression { return params.FORCE_FRONTEND }
                }
            }
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
            when { 
                anyOf {
                    changeset "backend/**"
                    changeset "Jenkinsfile"
                    expression { return params.FORCE_BACKEND }
                }
            }
            steps {
                dir('backend') {
                    loadEnvFile('budgetbooze', 'backend', 'production', '.env')
                }
            }
        }

        stage ("Build Frontend") {
            when { 
                anyOf {
                    changeset "src/**"
                    changeset "package.json"
                    changeset "package-lock.json"
                    changeset "Jenkinsfile"
                    expression { return params.FORCE_FRONTEND }
                }
            }
            steps {
                sh "npm run build"
            }
        }
        stage("Build Backend") {
            when { 
                anyOf {
                    changeset "backend/**"
                    changeset "Jenkinsfile"
                    expression { return params.FORCE_BACKEND }
                }
            }
            steps {
                dir('backend') {
                    sh 'npm run build:image'
                    // sh 'npm run save:image'
                }
            }
        }

        stage("Deploy Frontend") {
            when { 
                anyOf {
                    changeset "src/**"
                    changeset "package.json"
                    changeset "package-lock.json"
                    changeset "Jenkinsfile"
                    expression { return params.FORCE_FRONTEND }
                }
            }
            steps {
                sh 'scp -r build/* clark@clarkmiller.ca:/var/www/budgetbooze.ca/html'
            }
        }

        stage("Deploy Backend") {
            when { 
                anyOf {
                    changeset "backend/**"
                    changeset "Jenkinsfile"
                    expression { return params.FORCE_BACKEND }
                }
            }
            steps {
                // sh 'scp backend/budgetboozeimage.tar miller@sys1.clarkmiller.ca:/home/miller'
                // sh 'ssh sys1.clarkmiller.ca "docker load -i budgetboozeimage.tar"'
                sh 'ssh sys1.clarkmiller.ca "docker compose stop budgetbooze ; docker compose rm -f budgetbooze; docker compose up -d budgetbooze"'
            }
        }
    }
}