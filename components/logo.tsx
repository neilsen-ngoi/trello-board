import Image from 'next/image'
import Link from 'next/link'
import localFont from 'next/font/local'

import { cn } from '@/lib/utils'

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transiton items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <p className=" text-lg text-neutral-700 pb-1">RMBR</p>
      </div>
    </Link>
  )
}

export default Logo
