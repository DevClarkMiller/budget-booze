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
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage("Build") {
            steps {
                echo "Building Budget-Booze"
            }
        }
    }
}