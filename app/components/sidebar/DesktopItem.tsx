'use client'

import { IconType } from "react-icons";
import clsx from "clsx";
import Link from "next/link";

type DesktopItemProps = {
  href: string;
  icon: IconType;
  active?: boolean;
  label: string;
  onClick?: ()=>void
}

const DesktopItem: React.FC<DesktopItemProps> = ({active, href, icon: Icon, label, onClick}) => {
  const handleClick = () => {
    if(onClick){
      return onClick()
    }
    
  }
  return (
    <li onClick={handleClick}>
      <Link href={href} className={clsx("group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 transition-all duration-200",
        active && 'bg-gray-100 text-black'
      )}>
        <Icon className="shrink-0 w-6 h-6"/>
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
 
export default DesktopItem;