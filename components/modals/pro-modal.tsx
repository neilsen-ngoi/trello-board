'use client'

import Image from 'next/image'
import { Dialog, DialogContent } from '../ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'
import { Button } from '../ui/button'
import { useAction } from '@/hooks/use-action'
import { stripeRedirect } from '@/actions/stripe-redirect'
import { toast } from 'sonner'

export const ProModal = () => {
  const proModal = useProModal()
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onClick = () => {
    execute({})
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className=" max-w-md p-0 overflow-hidden">
        <div className=" aspect-video relative flex justify-center items-center">
          <Image src="/hero.svg" alt="hero" className="object-cover" fill />
        </div>
        <div className=" text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className=" font-semibold text-xl">Upgrade to premium today!</h2>
          <p className=" text-xs font-semibold text-neutral-700">
            Explore the best of RMBR
          </p>
          <div className=" pl-3">
            <ul className=" text-sm list-disc">
              <li>Unlimited Boards</li>
              <li>Advance checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            disabled={isLoading}
            onClick={onClick}
            className=" w-full"
            variant="primary"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
