import React, {useState} from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography, Button, TextField } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export function SubsettingToolExplorer(props) {
      const [stdio, setStdio] = useState("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.")
      let handleSubmit = () => {
        // api call, get data
        // let result = api call
        // setStdio(result)
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


function Buttons(props) {
  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("0");
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
        <div>
          <div>
              <TextField id="standard-basic" style={{width: "100%"}} label="Start:" value={start && (start)} onChange={handleStart}/>
              <TextField id="standard-basic" style={{width: "100%"}} label="End:" value={end && (end)} onChange={handleEnd}/>
          </div>
          <div className="center_horizontally_child">
              {/* <ButtonGroup aria-label="small outlined button group">
                  <Button onClick={this.handleStart}>Start</Button>
                  <Button onClick={this.handleStop}>Stop</Button>
              </ButtonGroup> */}
              <Button variant="outlined" color="primary" onClick={props.handleSubmit}> Submit </Button>
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

