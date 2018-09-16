const getExpirationDate = (date = null, expiringDays = 365) => {
  const expireDate = date ? new Date(date) : new Date();
  expireDate.setTime(expireDate.getTime() + (expiringDays * 24 * 60 * 60 * 1000));
  return expireDate;
};

const isServer = () => typeof navigator === 'undefined';

export { getExpirationDate, isServer };
