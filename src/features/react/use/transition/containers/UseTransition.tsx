'use client'

import React, { useState, useTransition } from 'react'

import ProductList from '../pieces/ProductList'
import styles from '../styles/useTransition.module.css'
import { generateProducts } from '../utils/data'

// NOTE: １万のダミーデータを作成
const dummyProducts = generateProducts()

const filterProducts = (filterWord: string) => {
  if (!filterWord) {
    return dummyProducts
  }
  return dummyProducts.filter((product) => product.includes(filterWord))
}

const UseTransition = () => {
  const [isPending, startTransition] = useTransition()
  const [filterWord, setFilterWord] = useState('')

  // NOTE: 特定のワードをキーに、１万のダミーデータから対象データを抽出
  const filteredProducts = filterProducts(filterWord)

  const updateFilterHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // NOTE: 状態（ステート）の更新を遅らせて、ユーザーのインプットの入出力を優先させる。（状態更新の優先順位低）
    startTransition(() => setFilterWord(event.target.value))
  }

  return (
    <div className={styles.app}>
      <h1>useTransition</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="数字を入力してください"
        onChange={updateFilterHandler}
      />
      <p className={styles.p}>
        {isPending && <span style={{ color: 'white' }}>プロダクトをアップデート中・・・</span>}
      </p>
      <ProductList products={filteredProducts} />
    </div>
  )
}

export default UseTransition
