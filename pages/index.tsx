import { Box, Button, Typography } from "@mui/material"
import SectionBox from "./components/SectionBox"
import {
  SetStateAction,
  createContext,
  useState,
  Dispatch,
  useEffect,
} from "react"
import useCompletedTasks from "@/hooks/useCompletedTasks"
import CompletedBox from "./components/CompletedBox"

export default function Home() {
  const { completedTasks, loadCompletedTasks } = useCompletedTasks()

  useEffect(() => {
    loadCompletedTasks()
  }, [])

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="10px">
      <SectionBox name="Ahok" loadCompletedTasks={loadCompletedTasks} />
      <SectionBox name="Juan" loadCompletedTasks={loadCompletedTasks} />
      <SectionBox name="Mbak Yeni" loadCompletedTasks={loadCompletedTasks} />
      <SectionBox name="Pak Puspa" loadCompletedTasks={loadCompletedTasks} />
      <CompletedBox completedTasks={completedTasks} />
    </Box>
  )
}
