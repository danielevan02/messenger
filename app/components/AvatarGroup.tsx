'use client'

import { User } from "@prisma/client";
import Image from "next/image";

type AvatarGroupProps = {
  users?: User[]
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({users=[]}) => {
  const slicedUsers = users.slice(0, 3)
  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-[12px]'
  }
  return (
    <div className="relative h-12 w-14">
      {slicedUsers.map((user, index)=>(
        <div key={user.id} className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionMap[index as keyof typeof positionMap]}`}>
          <Image
            alt="Avatar"
            fill
            src={user?.image || '/images/placeholder.jpg'}
          />
        </div>
      ))}
    </div>
  );
}
 
export default AvatarGroup;