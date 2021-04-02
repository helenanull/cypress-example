pipeline {
    agent any

    stages {
        stage('Dependencies') {
            steps {
                sh 'npm i'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'npm run cy:run:web'
            }
        }
    }
}