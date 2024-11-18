import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

type MobileItemProps = {
  href: string;
  icon: IconType;
  active?: boolean;
  label: string;
  onClick?: ()=>void
}

const MobileItem: React.FC<MobileItemProps> = ({href, icon: Icon, label, active, onClick}) => {
  const handleClick = () => {
    if(onClick){
      return onClick()
    }
  }
  return (
    <li onClick={handleClick} className="w-full">
      <Link href={href} className={clsx('group flex gap-x-3 text-sm leading-6 font-semibold justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100',
        active && 'bg-gray-100 !text-black'
      )}>
        <Icon className='h-6 w-6'/>
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
 
export default MobileItem;