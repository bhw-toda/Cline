import { pageData as indexPageData } from '@/pages/index.astro';
import { pageData as samplePageData } from '@/pages/sample-page/index.astro';
import { pageData as styleGuidePageData } from '@/pages/style-guide/index.astro';
import { pageData as testPageData } from '@/pages/test.astro';

const pages = [
  {
    pageData: indexPageData,
  },
  {
    pageData: samplePageData,
  },
  {
    pageData: styleGuidePageData,
  },
  {
    pageData: testPageData,
  },
];

export default pages;