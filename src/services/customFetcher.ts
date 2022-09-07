export const customFetcher = async (url: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/link-preview/?url=${url}`
  );
  const json = await response.json();
  return json.metadata;
};
