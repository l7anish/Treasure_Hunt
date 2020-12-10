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
                
                withCredentials([sshUserPrivateKey(credentialsId: 'ubuntu', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'ubuntu')]) {
                                  script{
                                    def remote = [:]
                                    remote.name = "ubuntu"
                                    remote.host = "15.206.15.125"
                                    remote.allowAnyHosts = true
                                    remote.user = ubuntu
                                    remote.identityFile = identity

                                    sshCommand remote: remote, command: '''cd Treasure_Hunt/ ;
                                     rm private.key ;
                                     rm public.key ;
                                     git pull origin master ;
                                     ssh-keygen -t rsa -b 4096 -m PEM -f private.key -N '' ;
                                     ssh-keygen -f private.key -e -m PKCS8 > public.key ;
                                     rm private.key.pub ;
                                     docker build -t treasure_hunt . ;
                                     docker rm -f treasure_hunt ;
                                     docker run --env-file ./env.list -d -v ./logs:/home/node/app/logs --name treasure_hunt -p 8081:8081 treasure_hunt ;
                                     '''
                                    }
                              }
                echo 'Deploying project'
            }
        }
    }


}