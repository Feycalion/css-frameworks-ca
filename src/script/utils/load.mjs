/**
 * Load and parse a JSON item from the local storage.
 *
 * @param {string} item - The key of the item to be loaded from local storage.
 * @returns {any} - The parsed item value, or null if the item is not found.
 */
export default function load(item) {
  /**
   * Retrieve the string representation of the item from local storage.
   * @type {string | null}
   */
  const itemString = localStorage.getItem(item);

  /**
   * Parsed JSON representation of the item retrieved from local storage.
   * @type {any}
   */
  const itemParsed = JSON.parse(itemString);

  // Return the parsed item value, or null if the item is not found
  return itemParsed;
}
