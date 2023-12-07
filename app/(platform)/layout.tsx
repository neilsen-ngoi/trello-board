import React from 'react'
import { Toaster } from 'sonner'

import { ModalProvider } from '@/components/providers/modal-providers'
import { ClerkProvider } from '@clerk/nextjs'

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster />
      <ModalProvider />
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout
