pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'npm run cy:run:web'
            }
        }
    }
}