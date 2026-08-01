import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <section className="relative max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 text-base leading-7 text-gray-400">
          The page you requested does not exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
        >
          Return to the homepage
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
