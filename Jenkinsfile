pipeline {
  agent any
  stages {
    stage('Checkout repo') {
      steps {
        git(url: 'https://github.com/kpietraszko/WebRtcTest', credentialsId: 'c629dda8-5055-4788-b71a-81f7ec988605')
      }
    }
    stage('Build and deploy WebRtc') {
        stage('Get and update modules & deploy WebRtc') {
          steps {
            sh 'sudo -n cp -Rf /var/www/webRtc/node_modules ${WORKSPACE}/webRtc/ || true'
            sh '''sudo -n su && 
sudo -n yarn install --prefer-offline'''
            sh 'sudo -n cp -Rf ${WORKSPACE}/webRtc /var/www/'
            sh 'sudo -n rm -rf ${WORKSPACE}/webRtc'
          }
        }
		stage('Get and update modules & deploy WebRtcClient') {
          steps {
            dir(path: 'webRtcClient') {
              sh '''sudo -n su && 
yarn install'''
              sh '''sudo -n su && 
yarn build'''
            }

            sh 'sudo -n cp -af ${WORKSPACE}/webRtcClient/build/. /var/www/webRtcClient'
            sh 'sudo -n rm -rf ${WORKSPACE}/webRtcClient'
          }
      }
    }
  }
}