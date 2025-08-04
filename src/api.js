export const urunleriGetir = async () => {
  const response = await fetch("/urunler.json");
  const data = await response.json();
  return data.products || [];
};
