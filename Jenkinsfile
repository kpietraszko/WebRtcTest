pipeline {
  agent any
  stages {
    stage('Checkout repo') {
      steps {
        git(url: 'https://github.com/kpietraszko/WebRtcTest', credentialsId: 'c629dda8-5055-4788-b71a-81f7ec988605')
      }
    }
    stage('Stash WebRtc') {
      parallel {
        stage('Build WebRtc') {
          steps {
            stash(name: 'stash1', includes: 'webRtc/*')
          }
        }
        stage('Build WebRtcClient') {
          steps {
            stash(name: 'stash2', includes: 'webRtcClient/*')
          }
        }
      }
    }
    stage('Unstash WebRtc') {
      parallel {
        stage('Deploy WebRtc') {
          steps {
            unstash 'stash1'
            sh 'sudo -n cp -Rf ${WORKSPACE}/webRtc /var/www/webRtc'
            dir(path: '/var/www/webRtc') {
              sh 'npm install'
            }

          }
        }
        stage('Deploy WebRtcClient') {
          steps {
            unstash 'stash2'
            sh 'sudo -n cp -Rf ${WORKSPACE}/webRtcClient /var/www/webRtcClient'
            dir(path: '/var/www/webRtcClient') {
              sh 'npm install'
            }

            sh 'sudo systemctl restart nginx'
          }
        }
      }
    }
  }
}