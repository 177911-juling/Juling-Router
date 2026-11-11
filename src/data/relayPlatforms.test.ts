import { expect, it } from 'vitest';
import { pickRelayPlatforms, RELAY_MAIN, RELAY_REGIONS } from './relayPlatforms';

it('keeps the main site first and picks two distinct regions', () => {
  const picks = pickRelayPlatforms(() => 0);
  expect(picks[0]).toEqual(RELAY_MAIN);
  expect(picks.slice(1).map((platform) => platform.name)).toEqual([
    RELAY_REGIONS[0].name,
    RELAY_REGIONS[1].name,
  ]);
});

it('never repeats a region at the top of the random range', () => {
  const picks = pickRelayPlatforms(() => 0.999999);
  expect(picks).toHaveLength(3);
  const names = picks.slice(1).map((platform) => platform.name);
  expect(names).toHaveLength(2);
  expect(new Set(names).size).toBe(2);
});
