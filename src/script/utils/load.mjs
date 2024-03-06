export default function load(item) {
  console.log(item);
  const itemString = localStorage.getItem(item);
  const itemParsed = JSON.parse(itemString);

  return itemParsed;
}
