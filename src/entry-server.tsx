import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppShell } from './App';
import {
  getIndexableSeoPages,
  getNotFoundSeoPage,
  getSeoPage,
  renderSeoHead,
} from './seo/siteMetadata';

export function render(pathname: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={pathname}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  );
}

export function prerenderContract() {
  return {
    pages: getIndexableSeoPages(),
    notFound: getNotFoundSeoPage(),
  };
}

export function renderHead(pathname: string): string {
  return renderSeoHead(getSeoPage(pathname));
}
