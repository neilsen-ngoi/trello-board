'use client'

import { useEffect, useState } from 'react'

import CardModal from '../modals/cards'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <CardModal />
    </>
  )
}
