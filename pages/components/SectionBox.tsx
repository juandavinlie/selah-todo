import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useContext, useEffect, useState } from "react"

interface SectionBoxInterface {
  name: string
  loadCompletedTasks: () => void
}

const types = ["Beli", "Bayar", "Benerin", "Lain"]

const SectionBox = ({ name, loadCompletedTasks }: SectionBoxInterface) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [type, setType] = useState("")
  const [inputType, setInputType] = useState("")

  const supabase = useSupabaseClient()

  const [tasks, setTasks] = useState<any>([])

  const load = async () => {
    if (name === "Selesai") {
      const { data, error } = await supabase
        .from("tasks")
        .select()
        .eq("status", "selesai")

      if (error) {
        return
      }

      setTasks(data)
    } else {
      const { data, error } = await supabase
        .from("tasks")
        .select()
        .eq("responsible", name)
        .eq("status", "belum")

      if (error) {
        return
      }

      setTasks(data)
    }
  }

  const save = async () => {
    if (!newTaskDescription || !type) {
      return
    }

    const { data, error } = await supabase.from("tasks").insert({
      description: newTaskDescription,
      type,
      responsible: name,
    })

    if (!error) {
      setIsAdding(false)
      load()
    }
  }

  const done = async (taskId: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ status: "selesai", done_timestamp: new Date().toISOString() })
      .eq("id", taskId)

    if (!error) {
      load()
      loadCompletedTasks()
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="80%"
      gap="5px"
      boxShadow="1"
      borderRadius="10px"
      border="0.5px solid #D3D3D3"
      p="15px"
      bgcolor="white"
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">{name}</Typography>
        {!isAdding && (
          <Button
            variant="outlined"
            onClick={() => {
              setIsAdding(true)
            }}
          >
            Tambah
          </Button>
        )}
      </Box>
      {isAdding && (
        <Box
          display="flex"
          flexDirection="column"
          gap="5px"
          p="10px 10px"
          border="1px solid black"
        >
          <Box>
            <Typography>Deskripsi</Typography>
            <TextField
              value={newTaskDescription}
              fullWidth
              multiline
              inputProps={{
                style: { fontSize: 14, padding: 1 },
              }}
              InputProps={{ sx: { borderRadius: 3 } }}
              required
              error={!newTaskDescription}
              helperText={!newTaskDescription ? "Harus ada deskripsi" : ""}
              onChange={(e: any) => {
                setNewTaskDescription(e.currentTarget.value)
              }}
            />
          </Box>
          <Box>
            <Typography>Tipe</Typography>
            <Autocomplete
              value={type}
              onChange={(event: any, newType: string | null) => {
                setType(newType ? newType : "")
              }}
              inputValue={inputType}
              onInputChange={(event: any, newInputType: string) => {
                setInputType(newInputType)
              }}
              disablePortal
              id="currency-auto-complete"
              options={types}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "10px!important",
                  fontSize: "14px!important",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Bayar / Beli / Benerin / Lain"
                  error={!type}
                  helperText={!type ? "Harus pilih tipe" : ""}
                />
              )}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap="10px">
            <Button
              variant="outlined"
              onClick={() => {
                setIsAdding(false)
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                save()
              }}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      )}
      <Divider />
      <Box>
        {tasks.map((task: any) => {
          const addTimestampString = new Date(
            task.status === "belum" ? task.add_timestamp : task.done_timestamp
          ).toString()
          return (
            <Box key={task.id}>
              <Box
                display="flex"
                p="20px 0"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography>{task.description}</Typography>
                  <Typography fontSize={12}>
                    {addTimestampString.slice(
                      0,
                      addTimestampString.indexOf("GMT")
                    )}
                  </Typography>
                </Box>
                <Typography>{task.responsible}</Typography>
                <Typography>{task.type}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    done(task.id)
                  }}
                >
                  Selesai
                </Button>
              </Box>
              <Divider />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default SectionBox
