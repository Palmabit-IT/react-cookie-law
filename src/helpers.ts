export interface CoryphaApiProps {
  coryphaApiKey?: string
  coryphaDocumentCode?: string
  coryphaDocumentLanguage?: string
  coryphaUserId?: string
  wholeDomain?: boolean
}

const getExpirationDate = (date = null, expiringDays = 365): Date => {
  const expireDate = date ? new Date(date) : new Date();
  expireDate.setTime(expireDate.getTime() + expiringDays * 24 * 60 * 60 * 1000);
  return expireDate;
};

const isServer = () => typeof navigator === 'undefined';

const isUsingCorypha = ({
  coryphaApiKey,
  coryphaDocumentCode,
  coryphaDocumentLanguage,
}: CoryphaApiProps) => coryphaApiKey && coryphaDocumentCode && coryphaDocumentLanguage;

export { getExpirationDate, isServer, isUsingCorypha };
