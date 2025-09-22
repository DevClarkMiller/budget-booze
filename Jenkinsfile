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
                writeFile: ".env.development", text:""
                writeFile: ".env.production", text:""

                dir('backend') {
                    sh 'npm install'

                    writeFile: '.env', text:"""
                        DB_PATH='/usr/src/app/src/bevs.db'
                        #DB_PATH = src/bevs.db/usr/src/app #
                    """
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

        }
    }
}