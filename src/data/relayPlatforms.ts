/** Sponsored 聚灵 API platforms shown in every right inspector. */
export interface RelayPlatform {
  name: string;
  url: string;
}

export const RELAY_ICON = '/icons/sponsors/juling-api.png';

export const RELAY_MAIN: RelayPlatform = {
  name: '聚灵-主站',
  url: 'https://www.177911.com',
};

export const RELAY_REGIONS: RelayPlatform[] = [
  { name: '聚灵-美国', url: 'https://v1.177911.com' },
  { name: '聚灵-德国', url: 'https://v2.177911.com' },
  { name: '聚灵-香港', url: 'https://v3.177911.com' },
  { name: '聚灵-奥州', url: 'https://v4.177911.com' },
  { name: '聚灵-埃及', url: 'https://v5.177911.com' },
  { name: '聚灵-巴西', url: 'https://v6.177911.com' },
];

export const RELAY_PLATFORMS: RelayPlatform[] = [RELAY_MAIN, ...RELAY_REGIONS];

/** Main site first, then two distinct regions picked at random. */
export function pickRelayPlatforms(random: () => number = Math.random): RelayPlatform[] {
  const pool = [...RELAY_REGIONS];
  const picked: RelayPlatform[] = [];
  for (let count = 0; count < 2 && pool.length > 0; count += 1) {
    const index = Math.min(pool.length - 1, Math.floor(random() * pool.length));
    picked.push(pool.splice(index, 1)[0]);
  }
  return [RELAY_MAIN, ...picked];
}

let sessionPicks: RelayPlatform[] | null = null;

/** One random set per app session, shared by every inspector instance. */
export function currentRelayPlatforms(): RelayPlatform[] {
  sessionPicks ??= pickRelayPlatforms();
  return sessionPicks;
}
