// firebase storage kaydedilen urllerin dosya ismini çıkarıyoruz
export const decomposeUrl = (url) => {
  const parts = url.split("?");

  const filePart = parts[0];

  const fileName = decodeURIComponent(filePart.split("%2F").pop());
  return fileName;
};
