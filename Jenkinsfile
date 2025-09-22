pipeline {
    agent any
    stages {
        environment {
            NODE_ENV = 'production'
        }

        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Install Dependencies") {
            steps {
                sh 'npm install'
                cd 'backend'
                sh 'npm install'
            }
        }

        stage("Build") {
            steps {
                echo "Building Budget-Booze"
            }
        }
    }
}