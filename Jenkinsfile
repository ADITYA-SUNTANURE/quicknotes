pipeline {
  agent any

  stages {

    stage('Clone Repository') {
      steps {
        git branch: 'master', url: 'https://github.com/ADITYA-SUNTANURE/quicknotes.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t quicknotes:latest .'
      }
    }

    stage('Stop Old Container') {
      steps {
        sh 'docker stop quicknotes-app || true'
        sh 'docker rm quicknotes-app || true'
      }
    }

    stage('Run Container') {
      steps {
        sh 'docker run -d -p 3000:3000 --name quicknotes-app quicknotes:latest'
      }
    }

    stage('Health Check') {
      steps {
        sh 'sleep 3 && curl -f http://localhost:3000/health'
      }
    }

  }

  post {
    success {
      echo 'Pipeline completed successfully! QuickNotes is running.'
    }
    failure {
      sh 'docker stop quicknotes-app || true'
      sh 'docker rm quicknotes-app || true'
    }
  }
}
