const site: Site = {
  // サイト名
  title: 'BHWコーディングテンプレート',
  // トップページのみ付与される簡易的な説明文
  catch: '',
  // meta description
  description: 'コーポレートサイトなどで使用するテンプレートです',
  // URL（最後の / は含めない）
  url: 'https://bhw-template-astro.bhw.co.jp',
  // 文字コード
  charset: 'utf-8',
  // 言語
  lang: 'ja',
  locale: 'ja_JP',
  // ビューポートの指定
  viewport: 'width=device-width',
  // パンくずリストのトップページの文言
  breadcrumbHomeText: 'Top',
  // faviconのパス
  faviconPath: '/favicon.svg',
  // トップページ用 og:type
  ogType_top: 'website',
  // トップページ以外の og:type
  ogType: 'article',
  // og:image
  ogImage: '/ogp.jpg',
  // Twitter Card
  twitterCard: 'summary',
  // Twitter Site（空の場合出力しない） 例：@ユーザー名
  twitterSite: '',
};

export default site;