import { Monitor, Moon, Sun } from 'lucide-react';
import type { PageType } from '../types/navigation';
import { useThemeStore, type ThemeMode } from '../stores/themeStore';
import { UpdateDownloadButton } from './UpdateDownloadButton';
import { useSelfUpdateDownload } from '../hooks/useSelfUpdateDownload';
import { useI18n } from '../hooks/useI18n';
import { useNavigationStore } from '../stores/navigationStore';

const PAGE_INDEX: Record<string, string> = {
  apps: '01',
  models: '02',
  accounts: '03',
  freeModels: '04',
  voice: '05',
  mother: '06',
  aiNews: '07',
  aiCareer: '08',
  localLlm: '09',
};

export const PAGE_NUMBERS = PAGE_INDEX;

export function TopIndex() {
  const { t } = useI18n();
  const activePage = useNavigationStore((s) => s.activePage);
  const setActivePage = useNavigationStore((s) => s.setActivePage);
  const updateAvailable = useNavigationStore((s) => s.updateAvailable);
  const optionalPages = useNavigationStore((s) => s.optionalPages);
  const optionalPagesReady = useNavigationStore((s) => s.optionalPagesReady);
  const updateDownload = useSelfUpdateDownload();
  const themeMode = useThemeStore((s) => s.mode);
  const setThemeMode = useThemeStore((s) => s.setMode);
  const themeOptions: ReadonlyArray<{ mode: ThemeMode; icon: typeof Sun; label: string }> = [
    { mode: 'light', icon: Sun, label: t('settings.themeLight') },
    { mode: 'dark', icon: Moon, label: t('settings.themeDark') },
    { mode: 'system', icon: Monitor, label: t('settings.themeSystem') },
  ];

  const items: Array<{ page: PageType; label: string; show: boolean }> = [
    { page: 'apps', label: t('nav.appManager'), show: true },
    { page: 'models', label: t('nav.modelNexus'), show: true },
    { page: 'accounts', label: t('nav.accountCenter'), show: true },
    { page: 'freeModels', label: t('nav.freeModels'), show: true },
    { page: 'voice', label: t('voice.input'), show: true },
    { page: 'mother', label: t('nav.motherAgent'), show: true },
    { page: 'aiNews', label: t('nav.aiNews'), show: optionalPagesReady && optionalPages.aiNews },
    {
      page: 'aiCareer',
      label: t('nav.aiCareer'),
      show: optionalPagesReady && optionalPages.aiCareer,
    },
    {
      page: 'localLlm',
      label: t('nav.localServer'),
      show: optionalPagesReady && optionalPages.localLlm,
    },
  ];

  return (
    <nav className="top-index flex h-14 shrink-0 items-center justify-between gap-6 px-3">
      <div className="mr-2 flex shrink-0 items-center gap-2.5 border-r border-cyber-border/70 pr-6">
        <img
          src="/brand/bird.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="h-5 w-5 select-none"
        />
        <span className="hidden whitespace-nowrap text-[13px] font-semibold tracking-[0.02em] text-cyber-text sm:inline">
          {t('app.name')}
        </span>
      </div>
      <ul className="flex min-w-0 flex-1 items-stretch gap-6 overflow-x-auto [scrollbar-width:none]">
        {items
          .filter((item) => item.show)
          .map((item) => {
            const active = activePage === item.page;
            return (
              <li key={item.page} className="flex">
                <button
                  type="button"
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setActivePage(item.page)}
                  className={`top-index-tab relative flex h-14 items-center whitespace-nowrap text-[13.5px] font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] ${
                    active
                      ? 'text-cyber-text after:bg-cyber-accent'
                      : 'text-cyber-text-secondary after:bg-transparent hover:text-cyber-text'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
      </ul>
      <div className="flex shrink-0 items-center gap-4 pl-6 pr-4">
        <div className="flex items-center gap-0.5">
          {themeOptions.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              type="button"
              aria-label={label}
              aria-pressed={themeMode === mode}
              onClick={() => setThemeMode(mode)}
              className={`flex h-8 w-8 items-center justify-center rounded-[3px] transition-colors ${
                themeMode === mode
                  ? 'bg-cyber-elevated text-cyber-text'
                  : 'text-cyber-text-secondary hover:text-cyber-text'
              }`}
            >
              <Icon size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        {updateAvailable && (
          <UpdateDownloadButton
            version={updateAvailable}
            progress={updateDownload.progress}
            onClick={() => void updateDownload.download(updateAvailable)}
          />
        )}
      </div>
    </nav>
  );
}
