
# conding guide

## overview

gnode では、各コンポーネントのディレクトリ内に `index.js` と `style.css` を対にしておき、JavaScript から CSS を `import` する書き方がなされている。

CSS ファイルのインポートは JavaScrip のモジュールの仕組みでは実現できないが、これは webpack の raw-loader によって行われている。

読み込んだ CSS は単なる文字列としてインポートされ、これを shadow-dom のルート階層にインサートしてブラウザ上では参照が正しく行われるようになっている。この例のように、すべてのコンポーネントに共通する処理や操作については `GNODEElement` がその定義を持っており、すべてのコンポーネントはこれを `extends` で継承するように設計する。

記述例として、対象のコンポーネントの `index.js` の冒頭は以下のようになる。

```javascript
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

/**
 * component description
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEHoge extends GNODEElement {
```

## component

コンポーネントは以下の要件を満たすように設計すること。

### `index.js` から `export default` でひとつのクラスをエクスポートする

別途 `export` を禁ずるものではないが、かならず `default` を備えるようにする。

### `EVENTS` プロパティを `static` として持ち対応イベントを配列で返す

そのコンポーネントがどのようなイベントを発火するかは `static` に定義すること。

```javascript
/**
 * @type {Array.<string>}
 */
static get EVENTS(){return [
    'click',
];}
```

### getter としていくつかのプロパティをもたせる

| プロパティ名 | 意味 | getter が必須 | setter が必須 |
|---|---|---|---|
| `description` | そのコンポーネントの簡単な説明 | yes | no |
| `control` | そのコンポーネント内で利用している HTML 本来の `value` プロパティ等を持つコントロール（`input` など） | yes | no |
| `value` | そのコンポーネントの値 | yes | yes |

## `GNODEElement` 内で自動的に付与されるメンバ

すべてのコンポーネントは `GNODEElement` を継承するので、必然、最初から必ず持っているプロパティやメンバがある。

特に以下のプロパティは、gnode を利用する上で重要な意味を持つ。

| プロパティ名 | 型 | 意味 |
|---|---|---|
| `dom` | Array | コンポーネント全体を包んでいる `HTMLDivElement` |
| `shadow` | Array | shadow-dom のルート |
| `children` | Array | shadow-dom に含まれる子要素 |

gnode は各コンポーネントが shadow-dom になっているので、通常の利用の仕方としては `GNODEElement` クラスが持っている `append` か `appendChild` を使って DOM を append する。

### これらを踏まえた雛形

`./src/components/common/` 以下にコンポーネントを追加する場合、次のような `index.js` と `style.css` が雛形となる。

#### index.js

```javascript
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

/**
 * description
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEHoge extends GNODEElement {
    /**
     * @type {Array.<string>}
     */
    static get EVENTS(){return [
        'click',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'hoge component.';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.input;}
    /**
     * @type {string}
     */
    get value(){return this.input.value;}
    /**
     * @param {string} v - input value
     */
    set value(v){
        this.input.value = v;
    }

    /**
     * @constructor
     * @param {string} [value=''] - value
     * @param {string} [name=''] - name
     * @example
     * let E = new GNODEHoge('value', 'name');
     */
    constructor(value = '', name = ''){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {HTMLInputElement}
         */
        this.input = document.createElement('input');

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEHoge');
        this.append(this.input);

        // style setting ------------------------------------------------------
        this.addStyle({
            color:         `${CONST.COMPONENT_DEFAULT_COLOR}`,
            lineHeight:    `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            height:        `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            verticalAlign: 'middle',
            display:       'inline-block',
        });
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.input, 'click', (evt) => {
            this.emit('click', this.input.value, evt);
        }, false);
    }
    /**
     * set disabled attribute
     * @param {boolean} [enable=true] - disabled = !enable
     */
    enable(enable = true){
        if(enable === true){
            this.input.classList.remove('disabled');
        }else{
            this.input.classList.add('disabled');
        }
        this.input.disabled = !enable;
    }
    /**
     * set disabled attribute
     * @param {boolean} [disable=true] - disabled
     */
    disable(disable = true){
        this.enable(!disable);
    }
}
```

#### style.css

```css
input:hover {
    background-color: white;
}

input.disabled,
input.disabled:hover {
    background-color: silver;
    cursor: default;
}
```


