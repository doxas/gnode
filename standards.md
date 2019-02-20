
# standards

※というか運用ルールの覚書に近い

* 基本的に ESDoc の conversion を 100% にするのを最低限の位置づけにする
* できるだけ `class` とメソッドには `@example` をつけること
* `src` 以下に入ったものは webpack がよしなにする
* `src/static` は静的なローカルのモジュールなど
* `src/components` はコンポーネント類のルート
* `src/components/common` には粒度の最も小さいコンポーネントのみ入れる
* `src/components/hoge` でコンポーネントを分類しておく
* 各コンポーネントは `index.js and style.css` を持つ
* これらは Shadow Dom になるのでスタイルはコンポーネントレベルでスコープが閉じられることに注意
* コンポーネントは基本的に `EventEmitter3` を継承してるのでそれを踏まえて実装する
* sample.xxx 系のファイルでコンポーネントのサンプルを閲覧できるようにする
* `gen` と `head` というふたつの関数で insert 処理している


* `src/script.js` で全部のクラスやコンポーネントが集約されるが今は `window` に直接生やしてるので注意


