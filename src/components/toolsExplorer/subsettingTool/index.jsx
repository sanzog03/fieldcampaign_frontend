import React, {useState} from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography, Grid, Button, TextField, Box } from "@mui/material";

import { apiCall } from "./utils/apiCall";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export function SubsettingToolExplorer(props) {
      const [stdio, setStdio] = useState("Result Placeholder")
      let handleSubmit = async (start, end) => {
        // api call, get data
        try {
          let result = await apiCall(start, end);
          setStdio(JSON.stringify(result))
        } catch (error) {
          setStdio(JSON.stringify(error))
        }
      }
      return (
        <React.Fragment>
          <Box>
          <Grid container rowSpacing={{ xs: 3 }} sx={{p: 4}}>
            Subsetting Dates:
            <Grid item xs={12}>
              <Item>
                <Buttons handleSubmit={handleSubmit}/>
              </Item>
            </Grid>
            <Grid item xs={12}>
              Response:
              <Item>
                <OutputTypography stdio={stdio}/>
              </Item>
            </Grid>
          </Grid>
          </Box>
        </React.Fragment>
      )
}

// helper components

function Buttons(props) {
  const [start, setStart] = useState("2017-05-17 05:45:40 UTC");
  const [end, setEnd] = useState("2017-05-17 05:55:40 UTC");
  const handleStart = (event) => {
    if (event.target.value) {
      setStart(event.target.value)
    }
  }
  const handleEnd = (event) => {
    if (event.target.value) {
      setEnd(event.target.value)
    }
  }
  return (
        <Box sx={{m: 2}}>
          <Box sx={{mb: 1}}>
              <TextField id="standard-basic" style={{width: "100%", marginBottom:"10px"}} label="Start:" value={start && (start)} onChange={handleStart}/>
              <TextField id="standard-basic" style={{width: "100%", marginBottom:"10px"}} label="End:" value={end && (end)} onChange={handleEnd}/>
          </Box>
          <Box className="center_horizontally_child" sx={{mb: 1}}>
              <Button variant="outlined" color="primary" onClick={() => props.handleSubmit(start, end)}> Submit </Button>
          </Box>
        </Box>
      )
}

function OutputTypography(props) {
  return (
    <Typography variant="body2" gutterBottom>
      {props.stdio}
    </Typography>
  )
}

