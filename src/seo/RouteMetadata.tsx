import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoPage, SITE_NAME } from './siteMetadata';

function appendMeta(attributes: Record<string, string>) {
  const meta = document.createElement('meta');
  meta.dataset.rnpcSeo = 'metadata';

  for (const [name, value] of Object.entries(attributes)) {
    meta.setAttribute(name, value);
  }

  document.head.append(meta);
}

function applyRouteMetadata(pathname: string) {
  const page = getSeoPage(pathname);

  document.title = page.title;
  document.head
    .querySelectorAll('[data-rnpc-seo]')
    .forEach((element) => element.remove());

  appendMeta({ name: 'description', content: page.description });
  appendMeta({ name: 'robots', content: page.robots });

  if (page.canonicalUrl) {
    const canonical = document.createElement('link');
    canonical.dataset.rnpcSeo = 'metadata';
    canonical.rel = 'canonical';
    canonical.href = page.canonicalUrl;
    document.head.append(canonical);

    appendMeta({ property: 'og:type', content: page.openGraphType });
    appendMeta({ property: 'og:site_name', content: SITE_NAME });
    appendMeta({ property: 'og:url', content: page.canonicalUrl });
    appendMeta({ property: 'og:title', content: page.title });
    appendMeta({ property: 'og:description', content: page.description });
    appendMeta({ name: 'twitter:card', content: 'summary' });
    appendMeta({ name: 'twitter:title', content: page.title });
    appendMeta({ name: 'twitter:description', content: page.description });
  }

  for (const structuredData of page.structuredData) {
    const script = document.createElement('script');
    script.dataset.rnpcSeo = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.append(script);
  }
}

export default function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    applyRouteMetadata(location.pathname);
  }, [location.pathname]);

  return null;
}
