/**
 * Converts seconds to MM:SS format
 * @param {number} seconds - Total seconds to format
 * @returns {string} Formatted time as MM:SS
 * 
 * Example: formatTime(625) → "10:25"
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
