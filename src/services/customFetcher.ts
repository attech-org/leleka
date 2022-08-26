export const customFetcher = async (url: string) => {
  const response = await fetch(
    `http://127.0.0.1:3001/api/link-preview/?url=${url}`
  );
  const json = await response.json();
  // console.warn(json.metadata);
  return json.metadata;
};
