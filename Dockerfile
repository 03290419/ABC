# nodejs 이미지 
FROM node:20

# 컨테이너 내 작업 폴더 
WORKDIR /usr/src/app

# 실행파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# dbmate 미리 컴파일된 이진 파일 다운로드
RUN wget -O /usr/local/bin/dbmate https://github.com/amacneil/dbmate/releases/latest/download/dbmate-linux-amd64 && chmod +x /usr/local/bin/dbmate

# 나머지 파일 복사
COPY . .

# 컨테이너가 사용할 포트 
EXPOSE 8080

# 컨테이너 실행 시 실행 명령
CMD ["npm", "start"]