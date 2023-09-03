export const generateProducts = () => {
  // NOTE: １万のダミーデータを作成
  const products = []
  for (let i = 0; i < 10000; i++) {
    products.push(`Product ${i + 1}`)
  }
  return products
}
