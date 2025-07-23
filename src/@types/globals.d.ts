declare global {
  interface Site {
    title: string;
    catch: string;
    description: string;
    url: string;
    charset: string;
    lang: string;
    locale: string;
    viewport: string;
    breadcrumbHomeText: string;
    faviconPath: string;
    ogType_top: string;
    ogType: string;
    ogImage: string;
    twitterCard: string;
    twitterSite: string;
  }

  interface PageData {
    title: string;
    description: string;
    htmlClass?: string;
    bodyClass?: string;
    pagePath: string;
  }
}

export {};