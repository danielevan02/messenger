'use client'

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes()
  const {isOpen} = useConversation()

  if(isOpen){
    return null
  }
  return (
    <div className="fixed w-full bottom-0 z-40 items-center border-t lg:hidden">
      <ul className="flex justify-between">
        {routes.map((route)=>(
          <MobileItem
            key={route.href}
            href={route.href}
            active={route.active}
            icon={route.icon}
            onClick={route.onClick}
            label={route.label}
          />
        ))}
      </ul>
    </div>
  );
}
 
export default MobileFooter;