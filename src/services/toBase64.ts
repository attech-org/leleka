const toBase64 = (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () =>
      resolve(reader.result ? reader.result.toString() : "");

    reader.onerror = (error) => reject(error);
  });
export default toBase64;
