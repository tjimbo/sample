#!/bin/bash

ecspresso init --service=JrexpApp-EcsAppServiceABC8901F-JSf4rBq6cMXD --cluster=JrexpApp-EcsAppCluster7C7DF57B-ySIQuScP0DoH --force-overwrite
node overwrite-taskdef.js > ecs-task-def-new.json
mv ./ecs-task-def-new.json ./ecs-task-def.json

export IMAGE_TAG=$(date +'%Y%m%d%H%M')
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 277707131321.dkr.ecr.ap-northeast-1.amazonaws.com
docker build -t sampleapp .
docker tag sampleapp:latest 277707131321.dkr.ecr.ap-northeast-1.amazonaws.com/sampleapp:"$IMAGE_TAG"
docker push 277707131321.dkr.ecr.ap-northeast-1.amazonaws.com/sampleapp:"$IMAGE_TAG"
ecspresso deploy

aws ssm put-parameter --name imageTag --value "$IMAGE_TAG" --overwrite
