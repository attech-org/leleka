export const customFetcher = async (url: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}api/link-preview/?url=${url}`
  );
  const json = await response.json();
  console.log("TTTTT");
  console.log(url);
  console.log(json);
  if (response.status !== 200) {
    return {
      description: "",
      image: "",
      title: "",
      siteName: "",
      hostname: "",
      url,
    };
  }
  return json.metadata;
};
