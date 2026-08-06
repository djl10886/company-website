import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import RouteMetadata from './seo/RouteMetadata';
import MainPage from './pages/MainPage';
import DownloadPage from './pages/Download';
import NotFound from './pages/NotFound';
import Changelog from './pages/docs/unrealengine/changelog/Changelog';
import ChangelogDetail from './pages/docs/unrealengine/changelog/ChangelogDetail';
import UnrealIntroduction from './pages/docs/unrealengine/Introduction';
import UnrealQuickStart from './pages/docs/unrealengine/QuickStart';
import UnrealSetup from './pages/docs/unrealengine/Setup';
import UnrealConfiguration from './pages/docs/unrealengine/Configuration';
import UnrealAuthoringGuide from './pages/docs/unrealengine/AuthoringGuide';

export function AppShell() {
  return (
    <div className="min-h-screen site-bg">
      <RouteMetadata />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/docs/unrealengine/changelog" element={<Changelog />} />
        <Route path="/docs/unrealengine/changelog/:version" element={<ChangelogDetail />} />
        <Route path="/docs/unrealengine" element={<Navigate to="/docs/unrealengine/introduction" replace />} />
        <Route path="/docs/unrealengine/introduction" element={<UnrealIntroduction />} />
        <Route path="/docs/unrealengine/quickstart" element={<UnrealQuickStart />} />
        <Route path="/docs/unrealengine/setup" element={<UnrealSetup />} />
        <Route path="/docs/unrealengine/configuration" element={<UnrealConfiguration />} />
        <Route path="/docs/unrealengine/authoring-guide" element={<UnrealAuthoringGuide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
