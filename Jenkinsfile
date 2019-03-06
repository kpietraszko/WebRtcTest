pipeline {
  agent any
  stages {
    stage('Checkout repo') {
      steps {
        git(url: 'https://github.com/kpietraszko/WebRtcTest', credentialsId: 'c629dda8-5055-4788-b71a-81f7ec988605')
      }
    }
    stage('Build WebRtc') {
      parallel {
        stage('Build WebRtc') {
          steps {
            stash(name: 'stash1', includes: 'webRtc/*')
            dir(path: 'WebRtcTest/WebRtc') {
              sh 'npm install'
            }

          }
        }
        stage('Build WebRtcClient') {
          steps {
            dir(path: 'WebRtcTest/WebRtcClient') {
              sh 'npm install'
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
            sh 'sudo -n cp -Rf webRtc /var/www'
            dir(path: '/var/www/webRtc') {
              sh '''ls
sudo -n pm2 restart index.js'''
            }

          }
        }
        stage('Deploy WebRtcClient') {
          steps {
            unstash 'stash2'
            sh 'sudo -n sh \'cp -Rf webRtcClient /var/www/\''
            sh '''nginx -t
sudo systemctl restart nginx'''
          }
        }
      }
    }
  }
}