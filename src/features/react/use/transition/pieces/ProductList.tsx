import React from 'react'

import styles from '../styles/useTransition.module.css'

const ProductList = ({ products }: { products: string[] }) => {
  return (
    <ul className={styles.ul}>
      {products.map((product) => (
        <li key={product} className={styles.li}>
          {product}
        </li>
      ))}
    </ul>
  )
}

export default ProductList
