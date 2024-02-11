# Base_Image
FROM node:lts

# HostマシンからのAccessを受け付ける
ENV HOST 0.0.0.0

# Docker Cotainer上の作業ディレクトリ
WORKDIR /usr/src/app

# Docker コンテナが起動されたときに実行されるコマンド
ENTRYPOINT ["sh", "./setup.sh" ]