# BHW コーディングテンプレート ver.Astro（コーポレートサイト用）

## 概要

コーポレートや採用サイトなどある程度大きなサイトを制作する際に使用する。  
[Confluence]準備中

**DEV 環境**

[DEV 環境](https://bhw-template-astro.bhw.co.jp)

- ID
  `astro_template_user`
- PW
  `3xQ5xipn`

## 開発環境立ち上げ

### インストール

`npm install`

### 実行

`npm run start`

### ビルド

`npm run build`

### ビルドしたものを表示

`npm run preview`

## 必要な VSCode 拡張機能

- Prettier(esbenp.prettier-vscode)
- ESLint(dbaeumer.vscode-eslint)
- Stylelint(stylelint.vscode-stylelint)
- Astro(astro-build.astro-vscode)

VSCode の拡張機能メニューを開いて、@recommended と入力すると、上記の拡張機能が一覧で表示される。

## 使用ツール・技術概要

### HTML : Astro

HTML の生成を行う。  
Astro をテンプレート言語として使用する。

### CSS : SASS

SASS に対応しました。

### JS : Vite

開発サーバーの立ち上げ、および Astro の実行などのバックで動いている。
従来の webpack より高速にビルドが可能。

## HTML(Astro)について

- `/src/pages/`配下のファイルが HTML として htdocs に出力される。

### ディレクトリ構成

```
src
├─pages
│  │  index.njk  <!-- トップページ -->
│  │  sitemap.njk <!-- サイトマップ -->
│  │  404.njk <!-- 404ページ -->
│  ├─sample-page <!-- サンプルページ -->
│  │
│  └─style-guide <!-- スタイルガイド -->
│
│
├─css  <!-- styleを格納 -->
│
├─layouts
│  │
│  └─site-parts <!-- 共通パーツを管理 -->
│     │    Breadcrumb.astro <!-- パンくず -->
│     │    Footer.astro <!-- フッター -->
│     │    Footer_script.astro <!-- フッター下のscript -->
│     │    Header.astro <!-- ヘッダー -->
│     │    Meta.astro <!-- metaタグ -->
│     └─import <!-- JS,CSS,Fontのエントリーポイントを格納 -->
│
├─setting
│     pages.ts <!-- ページ一覧を使用したい場合の設定 -->
│     site.ts <!-- サイト全体の設定 -->
└─components
        ページ名 <!-- 各ページで使用するコンポーネントを格納 -->
```

## CSS について

- 原則**モバイルファースト**で書く。
- 375px 以下は JS で Viewport を固定しているため対応不要。（375px の見た目のまま縮小される）
- JS で扱う要素には.js-接頭辞を付与する。
- FLOCSS という CSS 設計手法をベースにしている。

#### ブレイクポイント

| sm    | md    | lg     | xl     | xxl                    |
| ----- | ----- | ------ | ------ | ---------------------- |
| 576px | 768px | 1024px | 1200px | 1400px（ほぼ使わない） |

\_media-queries.scss で管理。  
書き方は以下のようになる

```
/* ベーススタイル */
@include sm-screen {
  /* 576px以上のスタイル */
}
@include md-screen {
  /* 768px以上のスタイル */
}
@include lg-screen {
  /* 1024px以上のスタイル */
}
@include xl-screen {
  /* 1200px以上のスタイル */
}
@include xxl-screen {
  /* 1400px以上のスタイル */
}
```

#### 各ディレクトリの概要

| ディレクトリ | 接頭辞     | 用途                                                                             |
| ------------ | ---------- | -------------------------------------------------------------------------------- |
| \_variables  | なし       | CSS 変数の定義（色、タイポグラフィなど）                                         |
| \_foundation | なし       | ベーススタイルやリセットなど                                                     |
| \_plugins    | なし       | スライダー用 CSS など、プラグインの CSS を設置する                               |
| \_layout     | `.l-`      | 全体のコンテナやカラム、スタックなどのレイアウトに関するクラス                   |
| \_component  | `.c-`      | 見出しやボタンなど粒度の小さい基本コンポーネント                                 |
| \_project    | `.p-`      | ヘッダ・フッタやタブ、アコーディオンなど粒度の大きいコンポーネント               |
| \_utility    | `.u-`      | 余白やメディアクエリ毎の`display:none`の切り替え等、汎用的なユーティリティクラス |
| \_pages      | `.[name]-` | ページ固有のスタイル定義するクラス。ページごとに固有の接頭辞をつける             |

## コーディング開始時の流れ

- README.md の更新
- site.ts の設定（title,description など）
- CSS 変数の設定（カラーやタイポグラフィ）
- 必要に応じてユーティリティクラス追加（.u-bg-xxx .u-text-xxx など）
- スタイルガイド（/\_style-guide/index.astro）のデザイントークン更新
- Google フォントの読み込み

→ その後ベーススタイル・レイアウトの設定、各コンポーネントやページのコーディングへ

commit test