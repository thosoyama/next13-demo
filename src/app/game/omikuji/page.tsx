'use client'

import React, { useState } from 'react'

import omikuji from '~/features/common/utils/omikuji/omikuji'
import { timeout } from '~/features/common/utils/timer/timeout'

export default function Omikuji() {
  const [result, setResult] = useState<string | null>(null)

  const handleOmikuji = async () => {
    setResult('　')
    await timeout(100)
    setResult(omikuji.draw())
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button type="button" className="border border-sky-500" onClick={handleOmikuji}>
        おみくじを引く
      </button>
      <p className="p-24 text-5xl">{result}</p>
    </main>
  )
}
