import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"

const useCompletedTasks = () => {
  const supabase = useSupabaseClient()
  const [completedTasks, setCompletedTasks] = useState<any>([])

  const loadCompletedTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("status", "selesai")

    if (error) {
      return
    }

    setCompletedTasks(data)
  }

  return { completedTasks, loadCompletedTasks }
}

export default useCompletedTasks
