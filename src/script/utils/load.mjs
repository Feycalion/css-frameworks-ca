export default function load(item) {
  const itemString = localStorage.getItem(item);
  const itemParsed = JSON.parse(itemString);

  return itemParsed;
}
