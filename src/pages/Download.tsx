import {
  ArrowRight,
  CheckCircle2,
  Download as DownloadIcon,
  FileText,
  HardDrive,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { localRelease } from '../data/localRelease';

export default function DownloadPage() {
  const isTestRelease = localRelease.status === 'test';

  return (
    <main className="relative min-h-screen overflow-hidden pt-16">
      <div
        className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      <div
        className="orb fixed -right-40 top-20 h-[480px] w-[480px] opacity-15"
        style={{
          background:
            'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <section className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 max-w-3xl sm:mb-12">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300"
              style={{
                background: 'rgba(6,182,212,0.12)',
                border: '1px solid rgba(6,182,212,0.3)',
              }}
            >
              {localRelease.editionName} edition
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {localRelease.productName}{' '}
              <span className="text-cyan-400">{localRelease.editionName}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
              {localRelease.summary}
            </p>
          </div>

          {isTestRelease && (
            <div
              className="mb-8 rounded-xl p-4 sm:p-5"
              style={{
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.25)',
              }}
              role="status"
            >
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-amber-200">Download system test</p>
                  <p className="mt-1 text-sm leading-6 text-amber-100/70">
                    This page is testing the public download path. The file below is a
                    small text file, not the RealisticNPCs plugin or daemon.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.75fr)]">
            <section
              className="rounded-2xl p-5 sm:p-7"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              aria-labelledby="available-downloads"
            >
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    Available download
                  </p>
                  <h2 id="available-downloads" className="mt-2 text-2xl font-semibold text-white">
                    {localRelease.version}
                  </h2>
                </div>
                <span className="text-sm text-gray-500">No sign-in required</span>
              </div>

              <div className="space-y-4">
                {localRelease.artifacts.map((artifact) => (
                  <article
                    key={artifact.fileName}
                    className="flex flex-col gap-5 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                    style={{
                      background: 'rgba(7,13,26,0.72)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background: 'rgba(6,182,212,0.12)',
                          border: '1px solid rgba(6,182,212,0.25)',
                        }}
                      >
                        <FileText className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white">{artifact.fileName}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {artifact.format} <span aria-hidden="true">·</span>{' '}
                          {artifact.sizeLabel}
                        </p>
                      </div>
                    </div>

                    <a
                      href={artifact.downloadUrl}
                      download={artifact.fileName}
                      className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 sm:w-auto"
                    >
                      <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                      {artifact.label}
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <aside
              className="rounded-2xl p-5 sm:p-7"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg"
                style={{
                  background: 'rgba(129,140,248,0.12)',
                  border: '1px solid rgba(129,140,248,0.25)',
                }}
              >
                <HardDrive className="h-5 w-5 text-indigo-300" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-white">Run it locally</h2>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                The downloadable edition will remain available after the optional cloud
                portal launches.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Public download with no account required',
                  'Designed for a locally managed daemon',
                  'Independent from the future hosted service',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/docs/unrealengine/quickstart"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
            >
              Read the Quick Start
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="hidden text-gray-700 sm:inline" aria-hidden="true">
              /
            </span>
            <Link
              to="/docs/unrealengine/changelog"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              View the Changelog
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
