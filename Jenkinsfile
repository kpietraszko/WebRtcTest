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
            dir(path: 'webRtc') {
              sh 'sudo -n su && npm install'
            }

            stash(name: 'stash1', includes: 'webRtc/*')
          }
        }
        stage('Build WebRtcClient') {
          steps {
            dir(path: 'webRtcClient') {
              sh 'sudo -n su && npm install'
            }

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
          }
        }
        stage('Deploy WebRtcClient') {
          steps {
            unstash 'stash2'
            sh 'sudo -n cp -Rf ${WORKSPACE}/webRtcClient /var/www/webRtcClient'
            sh 'sudo systemctl restart nginx'
          }
        }
      }
    }
  }
}