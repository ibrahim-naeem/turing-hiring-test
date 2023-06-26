export const convertDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes} minutes ${remainingSeconds} seconds`;
};
