export default function checkImage(media) {
  if (!media || media === null) {
    const placeholderMedia = {
      url: "/src/images/021 True Sunset.png",
      alt: "Sunset gradient",
    };
    return placeholderMedia;
  }
  return media;
}
