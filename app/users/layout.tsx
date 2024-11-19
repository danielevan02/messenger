import { User } from "@prisma/client";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function UsersLayout({children}: {children: React.ReactNode}) {
  const user = await getUsers()
  return(
    <Sidebar>
      <div className="h-full">
        <UserList items={user}/>
        {children}
      </div>
    </Sidebar>
  )
}