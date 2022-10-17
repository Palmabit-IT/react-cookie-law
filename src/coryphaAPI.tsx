import Cookies from './Cookies';
import { CoryphaApiProps } from './helpers';

const CORYPHA_POLICIES_URL = 'https://api.corypha.app/app/v1/policies';

export interface CoryphaPreference {
  id: string
  name: string
  accepted: boolean
  required?: boolean
}

interface CoryphaApiCheckResponse {
  hasNewVersion: boolean
  version: {preferences: CoryphaPreference[]}
}

async function fetchCoryphaPreferences({
  coryphaApiKey,
  coryphaDocumentCode,
  coryphaDocumentLanguage,
}: CoryphaApiProps): Promise<CoryphaPreference[]> {
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

  const data: CoryphaApiCheckResponse = await response.json();

  return data.version.preferences || [];
}

async function saveCoryphaPreferences({
  coryphaApiKey,
  coryphaUserId,
  coryphaDocumentCode,
  wholeDomain = false,
}: CoryphaApiProps,
preferences: Pick<CoryphaPreference, 'id' | 'accepted'>[]) {
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
}: CoryphaApiProps) {
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

  const data: CoryphaApiCheckResponse = await response.json();

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
