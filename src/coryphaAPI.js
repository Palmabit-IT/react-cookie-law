import Cookies from './Cookies';

const CORYPHA_POLICIES_URL = 'https://stagingapi.corypha.app/app/v1/policies';

async function fetchCoryphaPreferences({
  coryphaApiKey,
  coryphaDocumentCode,
  coryphaDocumentLanguage,
}) {
  const response = await fetch(
    `${CORYPHA_POLICIES_URL}/${coryphaDocumentCode}?lang=${coryphaDocumentLanguage}`,
    {
      method: 'GET',
      headers: { 'X-API-KEY': coryphaApiKey },
    },
  );

  if (response.status !== 200) {
    return [];
  }

  const data = await response.json();

  return data.version.preferences || [];
}

async function saveCoryphaPreferences({
  coryphaApiKey,
  coryphaUserId,
  coryphaDocumentCode,
  wholeDomain = false,
},
preferences) {
  const cookies = new Cookies(wholeDomain);
  const user = coryphaUserId || cookies.get('rl_corypha_user_id');

  return fetch(`${CORYPHA_POLICIES_URL}/${coryphaDocumentCode}/users/${user}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': coryphaApiKey,
    },
    body: JSON.stringify({
      preferences: preferences.map((preference) => ({
        id: preference.id,
        accepted: preference.accepted,
      })),
    }),
  });
}

async function checkVersionCoryphaPreferences({
  coryphaUserId,
  coryphaApiKey,
  coryphaDocumentCode,
  coryphaDocumentLanguage,
  wholeDomain,
}) {
  const cookies = new Cookies(wholeDomain);
  const user = coryphaUserId || cookies.get('rl_corypha_user_id');

  const response = await fetch(
    `${CORYPHA_POLICIES_URL}/${coryphaDocumentCode}/users/${user}/check?lang=${coryphaDocumentLanguage}`,
    {
      method: 'GET',
      headers: { 'X-API-KEY': coryphaApiKey },
    },
  );

  if (response.status !== 200) {
    return { hasNewVersion: false, preferences: [] };
  }

  const data = await response.json();

  return {
    hasNewVersion: data.hasNewVersion,
    preferences: data.version.preferences || [],
  };
}

export {
  fetchCoryphaPreferences,
  saveCoryphaPreferences,
  checkVersionCoryphaPreferences,
};
