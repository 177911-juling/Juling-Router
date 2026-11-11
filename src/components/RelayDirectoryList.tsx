import { useState } from 'react';
import { open as shellOpen } from '@tauri-apps/plugin-shell';
import { currentRelayPlatforms, RELAY_ICON } from '../data/relayPlatforms';
import { useI18n } from '../hooks/useI18n';
import { DirectoryRow } from './DirectoryRow';

/** Sponsored API platforms — main site plus two rotating regions. */
export function RelayDirectoryList({ className = '' }: { className?: string }) {
  const { t } = useI18n();
  const [platforms] = useState(currentRelayPlatforms);

  return (
    <div className={className}>
      <div className="px-1 py-2 flex items-center gap-2">
        <span className="flex-1 h-px bg-cyber-border/60" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-cyber-text-secondary whitespace-nowrap">
          {t('model.relays')}
        </span>
        <span className="flex-1 h-px bg-cyber-border/60" />
      </div>
      <div className="space-y-2">
        {platforms.map((entry) => (
          <DirectoryRow
            key={entry.name}
            name={entry.name}
            url={entry.url}
            iconSrc={RELAY_ICON}
            onOpen={() => {
              void shellOpen(entry.url).catch(() => window.open(entry.url, '_blank'));
            }}
            openLabel={`Open ${entry.name} website`}
          />
        ))}
      </div>
    </div>
  );
}
