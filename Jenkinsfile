properties([pipelineTriggers([githubPush()])])

def remote = [:]
remote.name = "ubuntu"
remote.host = "15.206.15.125"
remote.allowAnyHosts = true

node {
        
        git url: 'https://github.com/sebin-vincent/Treasure_Hunt.git',branch: 'master'
        stage ('Build') {
            

            sh 'npm install'
        }

        stage ('Testing Stage') {

            echo "testing completed"
            echo "testing completed"
        }
        stage("Deploy") {
                withCredentials([sshUserPrivateKey(credentialsId: 'treasure_hunt_key_id', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'ubuntu')]) {
                                  remote.user = ubuntu
                                  remote.identityFile = identity

                                  sshCommand remote: remote, command: 'echo deployment completed !'
                              }
            }
}