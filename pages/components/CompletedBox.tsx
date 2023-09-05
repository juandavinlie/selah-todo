import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material"

interface CompletedBoxInterface {
  completedTasks: any[]
}

const CompletedBox = ({ completedTasks }: CompletedBoxInterface) => {
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
        <Typography variant="h5">Selesai</Typography>
      </Box>
      <Divider />
      <Box>
        {completedTasks ? (
          completedTasks.map((task: any) => {
            const doneTimestampString = new Date(task.done_timestamp).toString()
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
                      {doneTimestampString.slice(
                        0,
                        doneTimestampString.indexOf("GMT")
                      )}
                    </Typography>
                  </Box>
                  <Typography>{task.responsible}</Typography>
                  <Typography>{task.type}</Typography>
                </Box>
                <Divider />
              </Box>
            )
          })
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  )
}

export default CompletedBox
