import React from 'react'
import Image from 'next/image'

import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    DocumentChartBarIcon,
    CircleStackIcon,
    EnvelopeIcon,
    UserIcon,
    HomeIcon
} from '@heroicons/react/24/outline'
import SidebarRow from './SidebarRow'


function Sidebar() {
  return (
    <aside className="col-span-2">
      <div className="flex flex-col px-4 items-center md:items-start">
          <Image src="/twitter.svg" className="h-10 w-10 m-3" alt="Logo" width={100} height={100} />

          <SidebarRow Icon={HomeIcon} title="Home" />
          <SidebarRow Icon={HashtagIcon} title="Explore" />
          <SidebarRow Icon={BellIcon} title="Notifications" />
          <SidebarRow Icon={EnvelopeIcon} title="Messages" />
          <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
          <SidebarRow Icon={CircleStackIcon} title="Lists" />
          <SidebarRow Icon={UserIcon} title="Profile" />
          <SidebarRow Icon={DocumentChartBarIcon} title="More" />
      </div>
    </aside>
  )
}

export default Sidebar