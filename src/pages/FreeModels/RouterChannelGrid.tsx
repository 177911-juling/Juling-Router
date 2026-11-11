import { useFreeModels } from './provider';
import { useI18n } from '../../hooks/useI18n';

// Full-width channel switcher: one card per smart-router group.
export function RouterChannelGrid() {
  const { t } = useI18n();
  const { routers, activeRouterId, selectRouter, groupPending } = useFreeModels();

  // A single router already has its detail card; a second switcher card would
  // duplicate it and read as a differently sized card.
  if (routers.length <= 1) return null;

  return (
    <div className="router-channel-grid" role="tablist" aria-label={t('freeModels.router.title')}>
      {routers.map((router, index) => {
        const active = router.id === activeRouterId;
        const status = !router.groupEnabled
          ? t('freeModels.router.disabled')
          : router.running
            ? t('status.running')
            : t('freeModels.router.idle');
        const tone = !router.groupEnabled ? 'off' : router.running ? 'live' : 'ok';
        return (
          <button
            key={router.id}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`router-group-panel-${router.id}`}
            disabled={groupPending}
            onClick={() => void selectRouter(router.id)}
            className={`router-channel-card${active ? ' selected' : ''}`}
          >
            <span className="router-channel-top">
              <span className="router-channel-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="router-channel-status">
                <i className={`router-channel-dot ${tone}`} aria-hidden="true" />
                {status}
              </span>
            </span>
            <span className="router-channel-name">{router.name}</span>
            <span className="router-channel-meta">
              {router.usableCandidateCount} MODELS
              <span className="router-channel-endpoint">
                {router.baseUrl.replace(/^https?:\/\//, '')}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
