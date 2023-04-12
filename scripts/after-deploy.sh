#!/bin/bash

# 어플리케이션 디렉터리
REPOSITORY=/home/ubuntu/app/dist/ssr

# 배포 디렉터리로 이동
cd $REPOSITORY

# 종속성 설치
sudo npm i

# MARK: pm2를 사용해 80번 포트에 앱 실행
# 참조
# https://unchae.tistory.com/entry/PM2-80-443%ED%8F%AC%ED%8A%B8-%EC%82%AC%EC%9A%A9
authbind --deep pm2 reload index.js --watch
