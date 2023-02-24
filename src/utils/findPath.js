export const findPath = (location, url) => {
  if (location?.pathname?.includes(url)) {
    const pathName = location?.pathname?.replace(url, "");
    const path = pathName?.replace("/", "");
    const suffix = path ? "/" + path : "";
    return { path, suffix };
  } else return null;
};
