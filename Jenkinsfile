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
                
                withCredentials([sshUserPrivateKey(credentialsId: 'incognito', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'ubuntu')]) {
                                  script{
                                    def remote = [:]
                                    remote.name = "ubuntu"
                                    remote.host = "65.0.247.253"
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
                                     docker rm -f treasure_hunt || true ;
                                     rm ./logs/*.*
                                     docker run --env-file ./env.list -d -v ~/Treasure_Hunt/logs:/home/node/app/logs \
 -v /etc/incognito/live/ssl:/home/node/app/incognito/live/ssl:ro  --name treasure_hunt -p 8081:443 treasure_hunt ;
                                     '''
                                    }
                              }
                echo 'Deploying project'
            }
        }
    }


}