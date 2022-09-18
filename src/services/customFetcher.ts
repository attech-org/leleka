export const customFetcher = async (url: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL?.replace(
      /\/$/,
      ""
    )}/api/link-preview/?url=${url}`
  );
  const json = await response.json();
  if (response.status !== 200) {
    return {};
  }
  return json.metadata;
};
