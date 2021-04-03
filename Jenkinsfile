pipeline {
    agent any

    triggers {
        cron('H 8 * * *')
    }

    stages {
        stage('dependencies') {
            steps {
                sh 'npm i'
            }
        }
        stage('cypress parallel tests') {
            environment {
                CYPRESS_RECORD_KEY = credentials('cypress-example-record-key')
                CYPRESS_PROJECT_ID = credentials('cypress-example-project-id')
                CYPRESS_trashAssetsBeforeRuns = 'false'
            }

            parallel {
                stage('machine 1') {
                    steps {
                        sh "npm run cy:ci"
                    }
                }

                stage('machine 2') {
                    steps {
                        sh "npm run cy:ci"
                    }
                }
            }
        }
    }
}