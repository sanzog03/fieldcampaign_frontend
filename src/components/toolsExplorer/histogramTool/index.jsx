import React, {useState} from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography, Button, TextField } from "@mui/material";

import { apiCall } from "./utils/apiCall";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export function HistogramToolExplorer(props) {
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
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
              <Item>
                <Buttons handleSubmit={handleSubmit}/>
              </Item>
              <Item>
                <OutputTypography stdio={stdio}/>
              </Item>
            </Stack>
        </React.Fragment>
      )
}

// helper components

function Buttons(props) {
  const [instrumentType, setInstrumentType] = useState("FEGS");
  const handleInstrumentType = (event) => {
    if (event.target.value) {
      setInstrumentType(event.target.value)
    }
  }
  return (
        <div>
          <div>
              <TextField id="standard-basic" style={{width: "100%"}} label="Start:" value={instrumentType && (instrumentType)} onChange={handleInstrumentType}/>
          </div>
          <div className="center_horizontally_child">
              <Button variant="outlined" color="primary" onClick={() => props.handleSubmit(instrumentType)}> Submit </Button>
          </div>
        </div>
      )
}

function OutputTypography(props) {
  return (
    <Typography variant="body2" gutterBottom>
      {props.stdio}
    </Typography>
  )
}

