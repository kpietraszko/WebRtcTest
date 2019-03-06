pipeline {
  agent any
  stages {
    stage('Checkout repo') {
      steps {
        git(url: 'https://github.com/kpietraszko/WebRtcTest', credentialsId: 'dfd11a24-2b91-4a0b-9217-ef1c8106c675')
      }
    }
    stage('Build WebRtc') {
      parallel {
        stage('Build WebRtc') {
          steps {
            sh '''cd WebRtc
npm install
cd ..'''
            stash(name: 'stash1', includes: 'webRtc/*')
          }
        }
        stage('Build WebRtcClient') {
          steps {
            sh '''cd webRtcClient
npm install
cd ..'''
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
            sh 'cp -Rf webRtc /usr/local'
            dir(path: '/usr/local/webRtc') {
              sh 'sudo pm2 start index.js'
            }

          }
        }
        stage('Deploy WebRtcClient') {
          steps {
            unstash 'stash2'
            sh 'cp -Rf webRtcClient /var/www/'
            sh '''nginx -t
sudo systemctl restart nginx'''
          }
        }
      }
    }
  }
}