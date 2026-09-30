import {
  getAlbum,
  getAlbumList2,
  getArtist,
  getArtists,
  getCoverArtUrl,
  getSong,
  getStarred2,
  search3,
  getStreamUrl,
  setStarred as setNavidromeStarred,
} from './navidromeApi';

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatDuration(seconds) {
  const total = Math.floor(Math.max(0, toNumber(seconds)));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function buildCoverArtUrl(coverArt, size = 400) {
  return getCoverArtUrl(coverArt, size);
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function getAlbumListFromResponse(payload) {
  return asArray(payload?.albumList2?.album ?? payload?.albumList?.album);
}

function getArtistListFromResponse(payload) {
  const groups = asArray(payload?.artists?.index);
  const artists = groups.length
    ? groups.flatMap((group) => asArray(group.artist))
    : asArray(payload?.artists?.artist);
  return artists;
}

function getSongListFromResponse(payload) {
  return asArray(payload?.album?.song ?? payload?.songs?.song ?? payload?.searchResult3?.song);
}

export function normalizeAlbum(album) {
  return {
    id: album.id ?? album.name ?? album.title,
    title: album.name ?? album.title ?? 'Untitled album',
    artist: album.artist ?? album.artistName ?? 'Unknown artist',
    year: album.year ?? '',
    songs: toNumber(album.songCount ?? album.song_count ?? album.songs ?? 0),
    duration: formatDuration(album.duration),
    starred: Boolean(album.starred),
    cover: buildCoverArtUrl(album.coverArt ?? album.id, 800),
    coverArt: album.coverArt ?? album.id,
  };
}

export function normalizeArtist(artist) {
  return {
    id: artist.id ?? artist.name,
    name: artist.name ?? artist.title ?? 'Unknown artist',
    playCount: toNumber(artist.playCount),
    starred: Boolean(artist.starred),
    image: buildCoverArtUrl(artist.coverArt ?? artist.id, 500),
    coverArt: artist.coverArt ?? artist.id,
  };
}

export function normalizeSong(song, fallbackArtist = 'Unknown artist', fallbackAlbum = '') {
  return {
    id: song.id ?? song.title,
    title: song.title ?? song.name ?? 'Untitled track',
    artist: song.artist ?? song.artistName ?? fallbackArtist,
    album: song.album ?? fallbackAlbum,
    duration: formatDuration(song.duration),
    cover: buildCoverArtUrl(song.coverArt ?? song.id, 300),
    streamUrl: getStreamUrl(song.id),
  };
}

export async function fetchAlbums() {
  const response = await getAlbumList2('newest', 30);
  return getAlbumListFromResponse(response).map(normalizeAlbum);
}

export async function fetchArtists() {
  const response = await getArtists();
  return getArtistListFromResponse(response).map(normalizeArtist);
}

export async function fetchArtistById(id) {
  const response = await getArtist(id);
  const artist = response?.artist ?? {};
  const albums = asArray(artist.album);
  const albumDetails = await Promise.all(albums.slice(0, 6).map(async (album) => {
    try {
      const details = await getAlbum(album.id);
      return getSongListFromResponse(details).map((song) => normalizeSong(song, artist.name, album.name));
    } catch {
      return [];
    }
  }));
  const topTracks = albumDetails.flat().slice(0, 10);

  return {
    id: artist.id ?? id,
    name: artist.name ?? 'Unknown artist',
    headerImage: buildCoverArtUrl(artist.coverArt ?? artist.id, 1200),
    albums: albums.map(normalizeAlbum),
    playCount: toNumber(artist.playCount),
    starred: Boolean(artist.starred),
    topTracks,
  };
}

export async function fetchAlbumById(id) {
  const response = await getAlbum(id);
  const album = response?.album ?? {};
  const songs = getSongListFromResponse(response).map((song) => normalizeSong(song, album.artist, album.name));

  return {
    ...normalizeAlbum(album),
    tracks: songs,
  };
}

export async function fetchSearchResults(query) {
  const searchQuery = query.trim();
  if (!searchQuery) {
    return [];
  }

  const response = await search3(searchQuery);
  const result = response?.searchResult3 ?? {};
  const songs = asArray(result.song);
  const artists = asArray(result.artist);
  const albums = asArray(result.album);

  return [
    ...artists.map((artist) => ({
      id: artist.id,
      title: artist.name,
      artist: 'Artist',
      cover: buildCoverArtUrl(artist.coverArt ?? artist.id, 200),
      type: 'artist',
    })),
    ...albums.map((album) => ({
      ...normalizeAlbum(album),
      cover: buildCoverArtUrl(album.coverArt ?? album.id, 200),
      type: 'album',
    })),
    ...songs.map((song) => ({
      ...normalizeSong(song),
      cover: buildCoverArtUrl(song.coverArt ?? song.id, 200),
      type: 'song',
    })),
  ];
}

export async function fetchFavorites() {
  const response = await getStarred2();
  const songs = asArray(response?.starred?.song ?? response?.starred2?.song);
  return songs.map((song) => normalizeSong(song, song.artist, song.album));
}

export async function fetchSongById(id) {
  const response = await getSong(id);
  const song = response?.song;
  if (!song) throw new Error('Navidrome did not return the requested track');
  return normalizeSong(song);
}

export async function updateStarred(id, starred, itemType = 'song') {
  return setNavidromeStarred(id, starred, itemType);
}
