'use client'

import type { ChangeEvent, MutableRefObject } from 'react'
import { useImperativeHandle, useRef, useState } from 'react'

import styles from './page.module.scss'

export default function Page() {
  return <Form />
}

type InputFieldApi = {
  focus: () => void
  shake: () => void
  complete: () => void
}

type InputFieldProps = {
  label: string
  apiRef: MutableRefObject<InputFieldApi>
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function InputField(props: InputFieldProps) {
  const { label, apiRef, onChange } = props

  const [shouldShake, setShouldShake] = useState(false)
  const [shouldComplete, setShouldComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const classNames = [
    styles.input,
    shouldShake ? styles.shake : shouldComplete ? styles.complete : '',
  ]

  useImperativeHandle(
    apiRef,
    () => ({
      focus: () => {
        inputRef.current?.focus()
      },
      shake: () => {
        setShouldComplete(false)
        setShouldShake(true)
      },
      complete: () => {
        setShouldComplete(true)
      },
    }),
    [],
  )

  return (
    <>
      <p>{label}</p>
      <input
        ref={inputRef}
        className={classNames.join(' ')}
        onChange={onChange}
        onAnimationEnd={() => {
          setShouldShake(false)
        }}
      />
    </>
  )
}

function Form() {
  const inputRef = useRef<InputFieldApi>({} as InputFieldApi)
  const [name, setName] = useState('')

  const onSubmitClick = () => {
    if (!name.length) {
      inputRef.current?.focus()
      inputRef.current?.shake()
    } else {
      inputRef.current?.complete()
    }
  }

  return (
    <div className="m-4">
      <InputField label="Name" onChange={(e) => setName(e.currentTarget.value)} apiRef={inputRef} />
      <button onClick={onSubmitClick} className="m-2 border border-black p-2">
        Submit
      </button>
    </div>
  )
}
