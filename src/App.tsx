import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import FrameworkIntroduction from './pages/docs/framework/Introduction';
import FrameworkArchitecture from './pages/docs/framework/Architecture';
import FrameworkTerminology from './pages/docs/framework/Terminology';
import FrameworkCoreComponents from './pages/docs/framework/CoreComponents';
import UnrealIntroduction from './pages/docs/unrealengine/Introduction';
import UnrealQuickStart from './pages/docs/unrealengine/QuickStart';
import UnrealTerminology from './pages/docs/unrealengine/Terminology';
import UnrealSetup from './pages/docs/unrealengine/Setup';
import UnrealConfiguration from './pages/docs/unrealengine/Configuration';
import UnrealClasses from './pages/docs/unrealengine/Classes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/docs/framework" element={<Navigate to="/docs/framework/introduction\" replace />} />
          <Route path="/docs/framework/introduction" element={<FrameworkIntroduction />} />
          <Route path="/docs/framework/terminology" element={<FrameworkTerminology />} />
          <Route path="/docs/framework/core-components" element={<FrameworkCoreComponents />} />
          <Route path="/docs/framework/architecture" element={<FrameworkArchitecture />} />
          <Route path="/docs/unrealengine" element={<Navigate to="/docs/unrealengine/introduction\" replace />} />
          <Route path="/docs/unrealengine/introduction" element={<UnrealIntroduction />} />
          <Route path="/docs/unrealengine/terminology" element={<UnrealTerminology />} />
          <Route path="/docs/unrealengine/quickstart" element={<UnrealQuickStart />} />
          <Route path="/docs/unrealengine/setup" element={<UnrealSetup />} />
          <Route path="/docs/unrealengine/configuration" element={<UnrealConfiguration />} />
          <Route path="/docs/unrealengine/classes" element={<UnrealClasses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;