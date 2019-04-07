
# get started gnode

![](./asset/screenshot.jpg)

※サンプルの実行結果

## initial

```
$ npm install
$ npm run start
```

## files

### ./public

webpack でビルドしたバンドルされた JavaScript ファイルの出力先。

### ./public/sample.html

各コンポーネントのサンプルプレビュー。この HTML が `npm run start` で自動的に開かれる。

### ./src

ビルドの対象となるソースファイル。

### ./src/script.js

ビルドの対象となるソースのエントリポイントとなるファイル。

### ./src/static/

コンポーネントに依存しない、gnode 全体で利用するユーティリティはこちらの階層に。

### ./src/components/index.js

コンポーネントをまとめるためのインデックスとなるファイル。



