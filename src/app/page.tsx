import TaskBoard from "../components/Tasks/TaskBoard";
import { AppProvider } from "../context/AppContext";
import { headers } from "next/headers";

export default async function Home() {
  console.log("Loading headers");
  const hdrs = await headers();
  const user = {
    id: hdrs.get("x-user-id"),
    name: hdrs.get("x-user-name"),
  };

  if (!user.id || !user.name) {
    //TODO handle this condition, should never happen as its handles in Proxy.ts
    return
  }


  return (
    <AppProvider id={user.id} name={user.name}>
      <TaskBoard />
    </AppProvider>
  )
}
