# 福井県 新型コロナウイルス感染症対策サイト（非公式）

<!-- ![](https://github.com/tokyo-metropolitan-gov/covid19/workflows/production%20deploy/badge.svg) -->

[![福井県 新型コロナウイルス感染症対策サイト（非公式）](/static/ogp.png)](https://covid19-fukui.com/)

## 貢献の仕方
issueを作成の上、nomu_productionブランチにPRを発行してください。

### ブランチルール
nomu_production 以外への Pull Request は禁止です。  
Pull Request を送る際の branch は、以下のネーミングルールでお願いします。

## Slackチャンネルへの参加
このサイトを運営・改善していくためのSlackを開設しています。[こちらから登録](https://join.slack.com/t/nomunomu0504/shared_invite/zt-d6ad54zo-VqgGZR2qRtIjIKP04reI0Q)してご参加ください

## CONTRIBUTORS.md への追加について
ご協力いただいた皆様のお名前（ハンドルネーム）や役割を記す、[CONTRIBUTORS.md](./CONTRIBUTORS.md) というファイルがあります。 
何かしらの貢献を行った方は、ぜひこちらにもお名前をお載せください。 [#24](https://github.com/nomunomu0504/covid19/issues/24) の Issue をご覧の上、コメントください。

機能追加系： feature/#{ISSUE_ID}-#{branch_title_name}  
ホットフィックス系: hotfix/#{ISSUE_ID}-#{branch_title_name}

## ライセンス
本ソフトウェアは、[MITライセンス](./LICENSE.txt)の元提供されています。

### 環境構築の手順

- 必要となるNode.jsのバージョン: 10.19.0以上

**yarn を使う場合**
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

**docker compose を使う場合**
```bash
# serve with hot reload at localhost:3000
$ docker-compose up --build
```

**Vagrant を使う場合**
```bash
# serve with hot reload at localhost:3000
$ vagrant up
```

### `Cannot find module ****` と怒られた時

**yarn を使う場合**
```bash
$ yarn install
```

**docker compose を使う場合**
```bash
$ docker-compose run --rm app yarn install
```

### VSCode + Remote Containersで開発する場合

1. VSCodeの拡張機能「[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)」を導入します。
2. [この画像（外部サイト）](https://code.visualstudio.com/docs/remote/containers#_quick-start-try-a-dev-container)のように左下部の「Open Folder in Container」でこのリポジトリのルートを選択すれば環境構築が始まります。

#### Topic
- 設定を変更したい場合は、`.devcontainer/devcontainer.json`を修正してください。
詳細は[devcontainer.jsonのリファレンス](https://code.visualstudio.com/docs/remote/containers#_devcontainerjson-reference)を参照してください。
- Remote Container実行時のみ有効な拡張機能「ESLint」を導入していますが、必要に応じて`devcontainer.json`の`extensions`に追加してください。
詳細な手順は[こちら（外部サイト）](https://code.visualstudio.com/docs/remote/containers#_managing-extensions)を参照してください。
- 開発環境を再構築する場合は、左下部の「Rebuild Container」を実行してください。

### 本番環境/その他の判定
`process.env.GENERATE_ENV` の値が、本番の場合は`'production'`に、それ以外の場合は `'development'` になっています。  
テスト環境のみで実行したい処理がある場合はこちらの値をご利用ください。
