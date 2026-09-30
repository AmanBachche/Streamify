import { getAuth, getNavidromeUrl } from './navidromeAuth';

function credentialParams(auth) {
  return {
    u: auth.username,
    t: auth.token,
    s: auth.salt,
    c: auth.client,
    v: auth.version,
  };
}

export async function navidromeRequest(endpoint, params = {}) {
  const auth = getAuth();

  if (!auth) {
    throw new Error('Not authenticated with Navidrome');
  }

  const query = new URLSearchParams({ ...credentialParams(auth), f: 'json', ...params });

  const response = await fetch(`${getNavidromeUrl()}/rest/${endpoint}?${query}`);

  if (!response.ok) {
    throw new Error(`Navidrome HTTP error: ${response.status}`);
  }

  const data = await response.json();
  const result = data['subsonic-response'];

  if (result?.status !== 'ok') {
    throw new Error(
      result?.error?.message || 'Navidrome authentication failed'
    );
  }

  return result;
}

export async function ping() {
  return navidromeRequest('ping');
}

export async function getArtists() {
  return navidromeRequest('getArtists');
}

export async function getArtist(id) {
  return navidromeRequest('getArtist', { id });
}

export async function getAlbum(id) {
  return navidromeRequest('getAlbum', { id });
}

export async function getSong(id) {
  return navidromeRequest('getSong', { id });
}

export async function getGenres() {
  return navidromeRequest('getGenres');
}

export async function getAlbumList2(type = 'newest', size = 20) {
  return navidromeRequest('getAlbumList2', { type, size });
}

export async function getStarred2() {
  return navidromeRequest('getStarred2');
}

export async function search3(query, artistCount = 20, albumCount = 20, songCount = 20) {
  return navidromeRequest('search3', { query, artistCount, albumCount, songCount });
}

export function getStreamUrl(songId) {
  const auth = getAuth();
  if (!auth || !songId) return '';

  const query = new URLSearchParams({
    ...credentialParams(auth),
    id: String(songId),
  });
  return `${getNavidromeUrl()}/rest/stream?${query}`;
}

export function getCoverArtUrl(coverArt, size = 400) {
  const auth = getAuth();
  if (!auth || !coverArt) return '';

  const query = new URLSearchParams({
    ...credentialParams(auth),
    id: String(coverArt),
    size: String(size),
  });
  return `${getNavidromeUrl()}/rest/getCoverArt?${query}`;
}

export async function setStarred(id, starred, itemType = 'song') {
  if (!id) throw new Error('A Navidrome item ID is required.');
  const idParam = itemType === 'album' ? 'albumId' : itemType === 'artist' ? 'artistId' : 'id';
  return navidromeRequest(starred ? 'star' : 'unstar', { [idParam]: String(id) });
}
