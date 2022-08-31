interface DataObject {
  key: string;
  q: string;
}

export const getLinkPreview = async (url: string) => {
  const dataObject: DataObject = {
    key: "5077f2d1873bbe183521eb490ff0e2bb",
    q: url,
  };

  return fetch("https://api.linkpreview.net", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(dataObject),
  })
    .then((res) => {
      if (res.status != 200) {
        throw new Error("something went wrong");
      }
      return res.json();
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(error);
    });
};
