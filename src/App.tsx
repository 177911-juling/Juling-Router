import { useUsageIslandStore } from './stores/usageIslandStore';
import { initializeMergedPageFeatures } from './stores/mergedPagesMigration';
// App.tsx — Tauri application shell (lightweight router)
// Layout matches the original structure exactly.
// Pages extracted to src/pages/ with Provider pattern.
// Providers stay mounted; visited pages retain their state behind CSS.

import { lazy, useState, useEffect } from 'react';
import { PluginProductBridge } from './components/PluginProductBridge';
import { getVersion } from '@tauri-apps/api/app';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { listen } from '@tauri-apps/api/event';
import { IS_MACOS } from './utils/platform';
import { ToastProvider, ConfirmDialogProvider } from './components';
import type { PageType } from './types/navigation';
import { TopIndex, PAGE_NUMBERS } from './components/TopIndex';
import {
  Bot,
  ChartLine,
  Cpu,
  LayoutGrid,
  Mic,
  Newspaper,
  RadioTower,
  Route,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { isNewerVersion } from './utils/version';
import { fetchLatestManifest } from './services/updateManifest';
import { DownloadProvider } from './components/DownloadContext';
import { DownloadBar } from './components/DownloadBar';
import { TitleBar } from './components/TitleBar';
import { AppBackground } from './components/AppBackground';
import { RelayDirectoryList } from './components/RelayDirectoryList';
import { useBackgroundStore } from './stores/backgroundStore';
import { OnFirstVisit } from './components/OnFirstVisit';
import { ResizablePanels } from './components/ResizablePanels';
import { useModelNexus } from './pages/ModelNexus/context';
import { getSettings } from './api/tauri';

import { useI18n } from './hooks/useI18n';
import { useAutoClaimRewards } from './hooks/useAutoClaimRewards';

// Zustand stores
import { useToolsStore } from './stores/toolsStore';
import { useNavigationStore } from './stores/navigationStore';
import { optionalPagesFromSettings } from './stores/optionalPages';
/** Page-header glyphs: the boxed index reads as an icon, not a number. */
const PAGE_ICONS: Partial<Record<PageType, LucideIcon>> = {
  apps: LayoutGrid,
  models: Route,
  accounts: Users,
  freeModels: RadioTower,
  voice: Mic,
  mother: Bot,
  aiNews: Newspaper,
  aiCareer: ChartLine,
  localLlm: Cpu,
};

const PetsMain = lazy(() =>
  import('./pages/Pets/Pets').then((module) => ({ default: module.PetsMain }))
);
const PetsPanel = lazy(() =>
  import('./pages/Pets/Pets').then((module) => ({ default: module.PetsPanel }))
);
import { PluginHubMain, PluginHubPanel } from './pages/PluginHub';
import {
  RouterStatisticsProvider,
  RouterStatisticsPanel,
  RouterStatisticsMain,
} from './pages/RouterStatistics';

// Shared providers remain mounted; display modules load on first use.
import { ModelNexusProvider } from './pages/ModelNexus/provider';
import { AppManagerProvider } from './pages/AppManager/AppManagerProvider';
import { UsageIslandHost } from './pages/UsageIsland/UsageIslandHost';
import { LocalServerProvider } from './pages/LocalServer/provider';
import { MotherAgentProvider } from './pages/MotherAgent/MotherAgentProvider';
import { AiPulseProvider } from './pages/AiPulse/provider';
import { FreeModelsProvider } from './pages/FreeModels/provider';
import { VoiceInputProvider } from './pages/VoiceInput/provider';
const UsageIslandMain = lazy(() =>
  import('./pages/UsageIsland/UsageIsland').then((module) => ({ default: module.UsageIslandMain }))
);
const UsageIslandPanel = lazy(() =>
  import('./pages/UsageIsland/UsageIsland').then((module) => ({ default: module.UsageIslandPanel }))
);
const VoiceInputMain = lazy(() =>
  import('./pages/VoiceInput/VoiceInput').then((module) => ({ default: module.VoiceInputMain }))
);
const VoiceInputPanel = lazy(() =>
  import('./pages/VoiceInput/VoiceInput').then((module) => ({ default: module.VoiceInputPanel }))
);
const ModelNexusTitleActions = lazy(() =>
  import('./pages/ModelNexus/ModelNexus').then((module) => ({
    default: module.ModelNexusTitleActions,
  }))
);
const ModelNexusMain = lazy(() =>
  import('./pages/ModelNexus/ModelNexus').then((module) => ({ default: module.ModelNexusMain }))
);
const ModelNexusPanel = lazy(() =>
  import('./pages/ModelNexus/ModelNexus').then((module) => ({ default: module.ModelNexusPanel }))
);
const AddModelModal = lazy(() =>
  import('./pages/ModelNexus/ModelNexus').then((module) => ({ default: module.AddModelModal }))
);
const AppManagerMain = lazy(() =>
  import('./pages/AppManager/AppManagerComponents').then((module) => ({
    default: module.AppManagerMain,
  }))
);
const AppManagerTitleActions = lazy(() =>
  import('./pages/AppManager/AppManagerComponents').then((module) => ({
    default: module.AppManagerTitleActions,
  }))
);
const AppManagerPanel = lazy(() =>
  import('./pages/AppManager/AppManagerComponents').then((module) => ({
    default: module.AppManagerPanel,
  }))
);
const AppManagerBottom = lazy(() =>
  import('./pages/AppManager/AppManagerComponents').then((module) => ({
    default: module.AppManagerBottom,
  }))
);
const AppManagerErrorModal = lazy(() =>
  import('./pages/AppManager/AppManagerComponents').then((module) => ({
    default: module.AppManagerErrorModal,
  }))
);
const LocalServerPage = lazy(() =>
  import('./pages/LocalServer/LocalServer').then((module) => ({ default: module.LocalServerPage }))
);
const LocalServerBottom = lazy(() =>
  import('./pages/LocalServer/LocalServer').then((module) => ({
    default: module.LocalServerBottom,
  }))
);
const MotherAgentMain = lazy(() =>
  import('./pages/MotherAgent/MotherAgentMain').then((module) => ({
    default: module.MotherAgentMain,
  }))
);
const MotherAgentPanel = lazy(() =>
  import('./pages/MotherAgent/MotherAgentPanel').then((module) => ({
    default: module.MotherAgentPanel,
  }))
);
const FeedbackMain = lazy(() =>
  import('./pages/Feedback').then((module) => ({ default: module.FeedbackMain }))
);
const AiCareerMain = lazy(() =>
  import('./pages/AiCareer').then((module) => ({ default: module.AiCareerMain }))
);
const AiCareerFamilyPanel = lazy(() =>
  import('./pages/AiCareer').then((module) => ({ default: module.AiCareerFamilyPanel }))
);
const AiCareerTitleActions = lazy(() =>
  import('./pages/AiCareer').then((module) => ({ default: module.AiCareerTitleActions }))
);
const AiPulseTitleActions = lazy(() =>
  import('./pages/AiPulse/AiPulse').then((module) => ({ default: module.AiPulseTitleActions }))
);
const AiPulsePanel = lazy(() =>
  import('./pages/AiPulse/AiPulse').then((module) => ({ default: module.AiPulsePanel }))
);
const AiNewsMain = lazy(() =>
  import('./pages/AiPulse/AiPulse').then((module) => ({ default: module.AiNewsMain }))
);
const AccountCenterMain = lazy(() =>
  import('./pages/AccountCenter/AccountCenter').then((module) => ({
    default: module.AccountCenterMain,
  }))
);
const AccountCenterPanel = lazy(() =>
  import('./pages/AccountCenter/AccountCenter').then((module) => ({
    default: module.AccountCenterPanel,
  }))
);
const AccountCenterTitleActions = lazy(() =>
  import('./pages/AccountCenter/AccountCenter').then((module) => ({
    default: module.AccountCenterTitleActions,
  }))
);
const FreeModelsTitleActions = lazy(() =>
  import('./pages/FreeModels/FreeModels').then((module) => ({
    default: module.FreeModelsTitleActions,
  }))
);
const FreeModelsMain = lazy(() =>
  import('./pages/FreeModels/FreeModels').then((module) => ({ default: module.FreeModelsMain }))
);
const FreeModelsPanel = lazy(() =>
  import('./pages/FreeModels/FreeModels').then((module) => ({ default: module.FreeModelsPanel }))
);
const SettingsDialog = lazy(() =>
  import('./components/SettingsDialog').then((module) => ({ default: module.SettingsDialog }))
);
const ChangelogDialog = lazy(() =>
  import('./components/ChangelogDialog').then((module) => ({ default: module.ChangelogDialog }))
);

function ModelDialogs() {
  const { showAddModelModal } = useModelNexus();
  return (
    <OnFirstVisit active={showAddModelModal}>
      <AddModelModal />
    </OnFirstVisit>
  );
}

// Helper: h (hidden) vs shown class
const page = (active: boolean) => (active ? 'contents' : 'hidden');
const pageBlock = (active: boolean) => (active ? 'flex-1 flex flex-col overflow-hidden' : 'hidden');
const pageScroll = (active: boolean) => (active ? 'flex-1 overflow-y-auto page-scroll' : 'hidden');

function AppContent() {
  useAutoClaimRewards();
  const { t, locale, setLocale } = useI18n();
  const [showSettings, setShowSettings] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [showVoiceGuideOnClose, setShowVoiceGuideOnClose] = useState(false);

  // Stores — selector form so App.tsx (the root of the entire tree) only
  // re-renders when activePage flips, not on every motherNewMessage tick.
  const backgroundMode = useBackgroundStore((s) => s.mode);
  const activePage = useNavigationStore((s) => s.activePage);
  const setActivePage = useNavigationStore((s) => s.setActivePage);
  const setUpdateAvailable = useNavigationStore((s) => s.setUpdateAvailable);
  const scanTools = useToolsStore((s) => s.scanTools);
  const featuresReady = useNavigationStore(
    (state) => state.developerModeReady && state.developerMode
  );
  const appsTab = useNavigationStore((state) => state.appsTab);
  const smartAccessTab = useNavigationStore((state) => state.smartAccessTab);
  const optionalPages = useNavigationStore((state) => state.optionalPages);
  const optionalPagesReady = useNavigationStore((state) => state.optionalPagesReady);
  const enabledPages = optionalPagesReady
    ? optionalPages
    : { aiNews: false, aiCareer: false, localLlm: false };

  useEffect(() => {
    let active = true;
    let stopMigration: (() => void) | undefined;
    const islandAtRead = useUsageIslandStore.getState();
    void getSettings()
      .then((settings) => {
        if (!active) return;
        stopMigration = initializeMergedPageFeatures(settings, islandAtRead);
        if (!useNavigationStore.getState().optionalPagesReady)
          useNavigationStore.getState().setOptionalPages(optionalPagesFromSettings(settings));
      })
      .catch(() => {
        if (active) stopMigration = initializeMergedPageFeatures(null, islandAtRead);
      });
    return () => {
      active = false;
      stopMigration?.();
    };
  }, []);

  // ── Post-mount work — the window is already shown (main.tsx fires
  // appReady after first paint). Scan installed tools and check for app
  // updates in the background; both are non-blocking.
  useEffect(() => {
    const preload = async () => {
      try {
        await scanTools();
      } catch {
        /* continue anyway */
      }
      // Resolve the installed version first (local, instant). The changelog
      // auto-open is a purely local decision so it still fires when offline
      // (the dialog then shows its own error state); the update check below
      // needs the network.
      const appVersion = await getVersion().catch(() => '');
      if (appVersion) {
        try {
          const seen = localStorage.getItem('juling-router-changelog-seen');
          // Open on the first launch of any version we haven't recorded yet: a
          // fresh install / reinstall (no baseline) or a genuine upgrade. A real
          // uninstall wipes localStorage, so "updated" and "first install" are
          // indistinguishable — showing the notes once on either is the robust
          // choice. Only a downgrade (seen is newer) is skipped.
          if (!seen || isNewerVersion(appVersion, seen)) {
            setShowVoiceGuideOnClose(true);
            setShowChangelog(true);
          }
          if (seen !== appVersion) {
            localStorage.setItem('juling-router-changelog-seen', appVersion);
          }
        } catch {
          /* localStorage unavailable — skip the auto-open */
        }
      }
      try {
        const data = await fetchLatestManifest();
        if (data && appVersion && isNewerVersion(data.version, appVersion)) {
          setUpdateAvailable(data.version);
        }
      } catch {
        /* network error — ignore silently */
      }
    };
    preload();
    // scanTools + setUpdateAvailable are stable app-level actions; this is
    // intentionally a run-once-after-first-paint effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track maximized state so the rounded-corner shell goes square when the
  // window fills the screen (rounded corners against screen edges look off).
  const [isMaximized, setIsMaximized] = useState(false);
  useEffect(() => {
    const win = getCurrentWindow();
    win
      .isMaximized()
      .then(setIsMaximized)
      .catch(() => {});
    const unlisten = win.onResized(() => {
      win
        .isMaximized()
        .then(setIsMaximized)
        .catch(() => {});
    });
    return () => {
      unlisten.then((fn) => fn()).catch(() => {});
    };
  }, []);

  // Wire the macOS app-menu items to the same actions as the in-window buttons:
  // Settings (⌘,) opens the Settings dialog, Feedback opens the Feedback page.
  // The Rust menu handler emits these events; on Windows/Linux there is no app
  // menu, so they simply never fire.
  useEffect(() => {
    let disposed = false;
    const unlistens: Array<() => void> = [];
    const retain = (unlisten: () => void) => {
      if (disposed) unlisten();
      else unlistens.push(unlisten);
    };
    void listen('menu-open-settings', () => setShowSettings(true))
      .then(retain)
      .catch(console.error);
    void listen('menu-open-feedback', () => setActivePage('feedback'))
      .then(retain)
      .catch(console.error);
    return () => {
      disposed = true;
      unlistens.forEach((unlisten) => unlisten());
    };
  }, [setActivePage]);

  // Mirror isMaximized to <html> so the global #root clip-path in index.css
  // can drop its rounded corners when the window is maximized. Necessary
  // because the clip lives at #root level (covering modal/toast portals
  // outside the .rounded-xl shell) and CSS can't read React state directly.
  useEffect(() => {
    document.documentElement.classList.toggle('window-maximized', isMaximized);
  }, [isMaximized]);

  useEffect(() => {
    document.documentElement.classList.toggle('local-llm-page', activePage === 'localLlm');
    return () => document.documentElement.classList.remove('local-llm-page');
  }, [activePage]);

  const PageGlyph = PAGE_ICONS[activePage];
  const is = (p: PageType) => activePage === p;
  const showRelayDirectory =
    (featuresReady && is('apps') && (appsTab === 'pets' || appsTab === 'usageIsland')) ||
    is('freeModels') ||
    is('voice') ||
    is('mother') ||
    is('aiNews') ||
    is('aiCareer');
  const appsToolsActive = is('apps') && (appsTab === 'desktop' || appsTab === 'install');
  const routerActive = is('freeModels') && smartAccessTab === 'configuration';
  const feature = (tab: 'pets' | 'plugins' | 'usageIsland' | 'statistics') =>
    featuresReady &&
    (tab === 'statistics'
      ? is('freeModels') && smartAccessTab === 'statistics'
      : is('apps') && appsTab === tab);

  return (
    <ToastProvider>
      <FreeModelsProvider>
        <ConfirmDialogProvider>
          <DownloadProvider>
            {/* All Providers always mounted — only CSS hidden changes */}
            <MotherAgentProvider>
              <ModelNexusProvider>
                <AppManagerProvider>
                  <LocalServerProvider enabled={enabledPages.localLlm}>
                    <VoiceInputProvider>
                      <UsageIslandHost />
                      <div
                        className={`app-window-shell relative isolate flex flex-col h-screen w-full bg-cyber-bg overflow-hidden ${isMaximized || IS_MACOS ? '' : 'rounded-xl'}`}
                        data-page={activePage}
                        data-background={backgroundMode}
                      >
                        <AppBackground />
                        {backgroundMode !== 'characters' && (
                          <div aria-hidden="true" className="app-tech-field" />
                        )}
                        {/* Title bar */}
                        <TitleBar
                          onSettingsClick={() => setShowSettings(true)}
                          onFeedbackClick={() => setActivePage('feedback')}
                          onChangelogClick={() => {
                            setShowVoiceGuideOnClose(false);
                            setShowChangelog(true);
                          }}
                        />
                        <div className="flex flex-1 flex-col overflow-hidden text-cyber-text font-sans relative isolate">
                          <TopIndex />

                          <div className="flex min-h-0 flex-1 overflow-hidden px-4 pb-4 lg:px-[72px]">
                            <div
                              className={`min-w-0 flex-1 flex flex-col ${appsToolsActive ? 'overflow-visible' : 'overflow-hidden'}`}
                            >
                              {/* Main + Right panel row */}
                              <RouterStatisticsProvider>
                                <ResizablePanels rightHidden={is('localLlm')}>
                                  <main className="min-w-0 flex-1 flex flex-col overflow-hidden">
                                    <section className="flex-1 flex flex-col overflow-hidden">
                                      {/* Shared page title bar — fixed-height row so the title sits at the same baseline whether the page has tall action buttons or none */}
                                      <div className="page-title-bar mb-3 flex-shrink-0 flex items-center gap-3 h-10">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                          <span className="page-index" aria-hidden="true">
                                            {PageGlyph ? (
                                              <PageGlyph size={22} strokeWidth={1.9} />
                                            ) : (
                                              PAGE_NUMBERS[activePage]
                                            )}
                                          </span>
                                          <h2 className="cjk-title flex-shrink-0">
                                            {is('models') && t('page.modelNexus')}
                                            {is('accounts') && t('page.accountCenter')}
                                            {is('freeModels') && t('page.freeModels')}

                                            {is('apps') && t('page.appManager')}
                                            {is('aiCareer') && t('page.aiCareer')}
                                            {is('voice') && t('voice.input')}
                                            {is('aiNews') && t('page.aiNews')}
                                            {is('localLlm') && t('page.localServer')}
                                            {is('mother') && t('page.motherAgent')}
                                            {is('feedback') && t('page.feedback')}
                                          </h2>
                                        </div>
                                        {/* Title actions — always mounted but hidden */}
                                        <span className={page(is('models'))}>
                                          <OnFirstVisit active={is('models')}>
                                            <ModelNexusTitleActions />
                                          </OnFirstVisit>
                                        </span>
                                        <span className={page(is('accounts'))}>
                                          <OnFirstVisit active={is('accounts')}>
                                            <AccountCenterTitleActions />
                                          </OnFirstVisit>
                                        </span>
                                        <span className={page(is('freeModels'))}>
                                          <OnFirstVisit active={is('freeModels')}>
                                            <FreeModelsTitleActions />
                                          </OnFirstVisit>
                                        </span>
                                        {enabledPages.aiCareer && (
                                          <span className={page(is('aiCareer'))}>
                                            <OnFirstVisit active={is('aiCareer')}>
                                              <AiCareerTitleActions />
                                            </OnFirstVisit>
                                          </span>
                                        )}
                                        {enabledPages.aiNews && (
                                          <span className={page(is('aiNews'))}>
                                            <OnFirstVisit active={is('aiNews')}>
                                              <AiPulseTitleActions />
                                            </OnFirstVisit>
                                          </span>
                                        )}
                                        <span className={page(is('apps'))}>
                                          <OnFirstVisit active={is('apps')}>
                                            <AppManagerTitleActions />
                                          </OnFirstVisit>
                                        </span>
                                      </div>

                                      {/* Page content — always mounted, CSS hidden */}
                                      <div className={pageScroll(is('models'))}>
                                        <OnFirstVisit active={is('models')}>
                                          <ModelNexusMain />
                                        </OnFirstVisit>
                                      </div>
                                      <div
                                        className={
                                          is('accounts')
                                            ? 'flex-1 overflow-y-auto overflow-x-hidden cursor-default'
                                            : 'hidden'
                                        }
                                      >
                                        <OnFirstVisit active={is('accounts')}>
                                          <AccountCenterMain />
                                        </OnFirstVisit>
                                      </div>
                                      <div
                                        className={
                                          routerActive ? 'flex-1 overflow-y-auto' : 'hidden'
                                        }
                                      >
                                        <OnFirstVisit active={routerActive}>
                                          <FreeModelsMain />
                                        </OnFirstVisit>
                                      </div>

                                      <div className={pageBlock(appsToolsActive)}>
                                        <OnFirstVisit active={appsToolsActive}>
                                          <AppManagerMain />
                                        </OnFirstVisit>
                                      </div>
                                      {feature('pets') && (
                                        <div className={pageBlock(true)}>
                                          <OnFirstVisit active>
                                            <PetsMain />
                                          </OnFirstVisit>
                                        </div>
                                      )}
                                      <div className={pageBlock(feature('statistics'))}>
                                        <OnFirstVisit active={feature('statistics')}>
                                          <RouterStatisticsMain />
                                        </OnFirstVisit>
                                      </div>
                                      <div className={pageBlock(feature('plugins'))}>
                                        <OnFirstVisit active={feature('plugins')}>
                                          <PluginHubMain active={feature('plugins')} />
                                        </OnFirstVisit>
                                      </div>
                                      <div className={pageBlock(feature('usageIsland'))}>
                                        <OnFirstVisit active={feature('usageIsland')}>
                                          <UsageIslandMain />
                                        </OnFirstVisit>
                                      </div>
                                      {enabledPages.localLlm && (
                                        <div className={pageBlock(is('localLlm'))}>
                                          <OnFirstVisit active={is('localLlm')}>
                                            <LocalServerPage />
                                          </OnFirstVisit>
                                        </div>
                                      )}
                                      {enabledPages.aiCareer && (
                                        <div className={pageBlock(is('aiCareer'))}>
                                          <OnFirstVisit active={is('aiCareer')}>
                                            <AiCareerMain />
                                          </OnFirstVisit>
                                        </div>
                                      )}
                                      <div className={pageBlock(is('voice'))}>
                                        <OnFirstVisit active={is('voice')}>
                                          <VoiceInputMain />
                                        </OnFirstVisit>
                                      </div>
                                      {enabledPages.aiNews && (
                                        <div className={pageBlock(is('aiNews'))}>
                                          <OnFirstVisit active={is('aiNews')}>
                                            <AiNewsMain />
                                          </OnFirstVisit>
                                        </div>
                                      )}
                                      {/* MotherAgent: always mounted, hidden via CSS to preserve chat state */}
                                      <div
                                        className={`flex-1 flex flex-col overflow-hidden ${is('mother') ? '' : 'hidden'}`}
                                      >
                                        <OnFirstVisit active={is('mother')}>
                                          <MotherAgentMain />
                                        </OnFirstVisit>
                                      </div>
                                      <div className={pageScroll(is('feedback'))}>
                                        <OnFirstVisit active={is('feedback')}>
                                          <FeedbackMain />
                                        </OnFirstVisit>
                                      </div>
                                    </section>
                                  </main>

                                  <aside className="flex flex-col">
                                    {showRelayDirectory && (
                                      <div className="min-h-0 max-h-[65%] shrink-0 overflow-y-auto border-b border-cyber-border/60 px-2 pb-2">
                                        <RelayDirectoryList />
                                      </div>
                                    )}
                                    <div className="flex min-h-0 flex-1 flex-col">
                                      {feature('pets') && (
                                        <div className={page(true)}>
                                          <OnFirstVisit active>
                                            <PetsPanel />
                                          </OnFirstVisit>
                                        </div>
                                      )}
                                      <div className={page(feature('statistics'))}>
                                        <OnFirstVisit active={feature('statistics')}>
                                          <RouterStatisticsPanel />
                                        </OnFirstVisit>
                                      </div>
                                      <div className={page(feature('plugins'))}>
                                        <OnFirstVisit active={feature('plugins')}>
                                          <PluginHubPanel />
                                        </OnFirstVisit>
                                      </div>
                                      <div className={page(feature('usageIsland'))}>
                                        <OnFirstVisit active={feature('usageIsland')}>
                                          <UsageIslandPanel />
                                        </OnFirstVisit>
                                      </div>
                                      <div className={page(is('voice'))}>
                                        <OnFirstVisit active={is('voice')}>
                                          <VoiceInputPanel />
                                        </OnFirstVisit>
                                      </div>
                                      <div className={page(is('models'))}>
                                        <OnFirstVisit active={is('models')}>
                                          <ModelNexusPanel />
                                        </OnFirstVisit>
                                      </div>
                                      <div className={page(is('accounts'))}>
                                        <OnFirstVisit active={is('accounts')}>
                                          <AccountCenterPanel />
                                        </OnFirstVisit>
                                      </div>
                                      <div className={page(routerActive)}>
                                        <OnFirstVisit active={routerActive}>
                                          <FreeModelsPanel />
                                        </OnFirstVisit>
                                      </div>

                                      <div className={page(appsToolsActive)}>
                                        <OnFirstVisit active={appsToolsActive}>
                                          <AppManagerPanel />
                                        </OnFirstVisit>
                                      </div>
                                      {enabledPages.aiCareer && (
                                        <div className={page(is('aiCareer'))}>
                                          <OnFirstVisit active={is('aiCareer')}>
                                            <AiCareerFamilyPanel />
                                          </OnFirstVisit>
                                        </div>
                                      )}
                                      {enabledPages.aiNews && (
                                        <div className={page(is('aiNews'))}>
                                          <OnFirstVisit active={is('aiNews')}>
                                            <AiPulsePanel />
                                          </OnFirstVisit>
                                        </div>
                                      )}
                                      {/* MotherAgent panel: always mounted, hidden via CSS */}
                                      <div className={!is('mother') ? 'hidden' : 'contents'}>
                                        <OnFirstVisit active={is('mother')}>
                                          <MotherAgentPanel />
                                        </OnFirstVisit>
                                      </div>
                                    </div>
                                  </aside>
                                </ResizablePanels>
                              </RouterStatisticsProvider>

                              {/* Bottom bars — always mounted, CSS hidden */}
                              <div className={page(appsToolsActive)}>
                                <OnFirstVisit active={appsToolsActive}>
                                  <AppManagerBottom />
                                </OnFirstVisit>
                              </div>
                              {enabledPages.localLlm && (
                                <div className={page(is('localLlm'))}>
                                  <OnFirstVisit active={is('localLlm')}>
                                    <LocalServerBottom />
                                  </OnFirstVisit>
                                </div>
                              )}

                              {/* Download bar */}
                              <div className="flex-shrink-0 pt-2">
                                <DownloadBar />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Modals */}
                      <ModelDialogs />
                      <OnFirstVisit active={appsToolsActive}>
                        <AppManagerErrorModal />
                      </OnFirstVisit>
                    </VoiceInputProvider>
                  </LocalServerProvider>
                </AppManagerProvider>
              </ModelNexusProvider>
            </MotherAgentProvider>

            {/* Settings dialog */}
            <OnFirstVisit active={showSettings}>
              <SettingsDialog
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                locale={locale}
                onLocaleChange={setLocale}
              />
            </OnFirstVisit>

            {/* Changelog dialog */}
            <OnFirstVisit active={showChangelog}>
              <ChangelogDialog
                isOpen={showChangelog}
                showVoiceGuideOnClose={showVoiceGuideOnClose}
                onClose={() => setShowChangelog(false)}
              />
            </OnFirstVisit>
          </DownloadProvider>
        </ConfirmDialogProvider>
      </FreeModelsProvider>
    </ToastProvider>
  );
}

function App() {
  const activePage = useNavigationStore((s) => s.activePage);
  const newsEnabled = useNavigationStore((s) => s.optionalPagesReady && s.optionalPages.aiNews);
  return (
    <AiPulseProvider enabled={newsEnabled} active={activePage === 'aiNews'}>
      <PluginProductBridge />
      <AppContent />
    </AiPulseProvider>
  );
}

export default App;
