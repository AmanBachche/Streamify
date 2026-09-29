const NAVIDROME_URL = 'http://localhost:4533';

export async function navidromeRequest(endpoint, params = {}) {
  const url = new URL(`${NAVIDROME_URL}/rest/${endpoint}`);

  const searchParams = new URLSearchParams({
    ...params,
    f: 'json',
    v: '1.16.1',
    c: 'streamify',
  });

  url.search = searchParams.toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Navidrome request failed: ${response.status}`);
  }

  const data = await response.json();

  if (data['subsonic-response']?.status !== 'ok') {
    throw new Error(
      data['subsonic-response']?.error?.message || 'Navidrome API error'
    );
  }

  return data['subsonic-response'];
}
