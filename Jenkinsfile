pipeline{

    agent any
    triggers{
        githubPush()
    }
    stages{
        stage('Build'){
            steps{
                echo 'Building'
            }
        }
        stage('Deploy'){
            
            steps{
                script{
                def remote = [:]
                remote.name = "ubuntu"
                remote.host = "15.206.15.125"
                remote.allowAnyHosts = true
                }
                withCredentials([sshUserPrivateKey(credentialsId: 'ubuntu', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'ubuntu')]) {
                                  remote.user = ubuntu
                                  remote.identityFile = identity

                                  sshCommand remote: remote, command: 'echo deployment completed !'
                              }
                echo 'Deploying project'
            }
        }
    }


}