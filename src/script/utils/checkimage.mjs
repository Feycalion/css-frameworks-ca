/**
 * Check and provide a default image if the given media is null or undefined.
 *
 * @param {Object} media - The media object to be checked.
 * @param {string} media.url - The URL of the media.
 * @param {string} media.alt - The alternative text for the media.
 * @returns {Object} - The original media object if not null, or a placeholder media object.
 */
export default function checkImage(media) {
  /**
   * Placeholder media object to be returned when the provided media is null or undefined.
   * @type {Object}
   * @property {string} url - The URL of the placeholder media.
   * @property {string} alt - The alternative text for the placeholder media.
   */
  const placeholderMedia = {
    url: "/src/images/021 True Sunset.png",
    alt: "Sunset gradient",
  };

  // Check if media is null or undefined, return placeholderMedia if true
  if (!media || media === null) {
    return placeholderMedia;
  }

  // Return the original media object if not null
  return media;
}
