# Treasure_Hunt

test1-1
test-2

Depoyment

In production

docker build -t treasure-hunt .
docker run --env-file .\env.list -d --name treasure_hunt -p 8081:8081 treasure-hunt
//env.list contains environment variables for NODE_ENV,dbName,dbPassword.

ssh-keygen -t rsa -b 4096 -m PEM -f private.key -N '""'
ssh-keygen -f private.key -e -m PKCS8 > public.key
rm ./private.key
rm ./private.pub.key


                                    
                                     
                                     
                                     


