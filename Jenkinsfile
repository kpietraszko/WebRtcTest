pipeline {
  agent any
  stages {
    stage('Checkout repo') {
      steps {
        git(url: 'https://github.com/kpietraszko/WebRtcTest', credentialsId: 'c629dda8-5055-4788-b71a-81f7ec988605')
      }
    }
    stage('Build and deploy WebRtc') {
      parallel {
        stage('Build & deploy WebRtc') {
          steps {
            sh 'sudo -n cp -Rf ${WORKSPACE}/webRtc /var/www/'
            sh '''cd /var/www/webRtc && 
sudo -n su && 
sudo -n yarn install --prefer-offline'''
          }
        }
        stage('Build WebRtcClient') {
          steps {
            sh 'sudo -n cp -Rf ${WORKSPACE}/webRtcClient /var/www/'
            sh '''cd /var/www/webRtcClient && 
sudo -n su && 
yarn install --prefer-offline'''
          }
        }
      }
    }
  }
}