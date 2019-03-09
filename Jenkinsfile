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
        stage('Get and update modules & deploy WebRtc') {
          steps {
            sh 'sudo -n cp -Rf /var/www/webRtc/node_modules ${WORKSPACE}/webRtc/'
            sh '''sudo -n su && 
sudo -n yarn install --prefer-offline'''
            sh 'sudo -n cp -Rf ${WORKSPACE}/webRtc /var/www/'
          }
        }
        stage('Get and update modules & deploy WebRtcClient') {
          steps {
            sh 'sudo -n cp -Rf /var/www/webRtcClient/node_modules ${WORKSPACE}/webRtcClient/'
            sh '''sudo -n su && 
yarn install --prefer-offline'''
            sh 'sudo -n cp -Rf ${WORKSPACE}/webRtcClient /var/www/'
          }
        }
      }
    }
  }
}