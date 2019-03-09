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
            dir(path: 'webRtc') {
              sh 'sudo -n su && yarn install --prefer-offline'
            }

            sh 'sudo -n cp -Rf ${WORKSPACE}/webRtc /var/www/'
          }
        }
        stage('Build WebRtcClient') {
          steps {
            dir(path: 'webRtcClient') {
              sh 'sudo -n su && yarn install --prefer-offline'
            }

            sh 'sudo -n cp -Rf ${WORKSPACE}/webRtcClient /var/www/'
          }
        }
      }
    }
  }
}