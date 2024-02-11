# Travel Bonds App (AI コンシェルジュによる近い遊び場提案 Web サービス)

- Qiita ハッカソン 2024 (2024/2/10〜2/11) に参加した際に開発した作品

## App 概要

1. AI コンシェルジュが、あなたの現在位置(GPS)情報と、好みの場所のタイプから、距離的に近いおすすめスポットを提案してくれます。

## 環境構築方法(初期 setup)

<br>

### 0. 前提条件

- 先に BackEnd-API を起動して、Docker Network の構築も完了している状態。

- .env の NEXT_PUBLIC_GOOGLE_MAPS_API_KEY に Google Maps API の API Key が必要

### 1. パッケージを install する

app ディレクトリに移動して、パッケージを install する

```bash
cd app/ && yarn install
```

### 2. Docker Image の Build & Docker Container の起動

Docker Image のビルド と コンテナの実行を実施します。

```bash
docker-compose up --build
```

### 3. Web ブラウザからアクセスする

http://localhost:3008/ にアクセスして、FrontApp の起動を確認する
