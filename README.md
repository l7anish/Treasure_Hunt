# Treasure_Hunt

Local Deployment

1. git clone https://github.com/sebin-vincent/Treasure_Hunt.git

2. cd Treasure_Hunt

3. Generate RSA256 public_key/private_key pairs for JWT token generation and verification
```
openssl genrsa -out ./private.key 4096
openssl rsa -in private.key -pubout -outform PEM -out public.key
```
Refer link: https://docs.mia-platform.eu/docs/runtime_suite/client-credentials/jwt-private-public-key-generation


4. create file env.list with arguments (ex: NODE_ENV,dbUser,dbPassword) like below
```
NODE_ENV=development
dbUser=<dbUserName>
dbPassword=<dbPassword>
```

5. Build docker image
```
docker build -t treaure_hunt_image
```

6. Run docker container
```
docker run --env-file .\env.list -d --name treasure_hunt -p 8081:8081 treasure-hunt
```

7. To stop container
```
docker rm -f treasure-hunt
```



                                    
                                     
                                     
                                     


