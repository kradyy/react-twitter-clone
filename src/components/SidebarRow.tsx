import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: string,
    onClick?: () => {}
}

function SidebarRow({Icon, title, onClick}: Props) {
  return (
    <div onClick={() => { onClick?.()}} className="flex items-center space-x-2 px-4 max-w-fit py-3 hover:bg-gray-100 group cursor-pointer transition-all duration-200 w-auto rounded-full">
        <Icon className="h-6 w-6"/>
        <span className="hidden md:inline-flex group-hover:text-primary text-base font-light lg:text-xl">{title}</span>
    </div>
  )
}

export default SidebarRow