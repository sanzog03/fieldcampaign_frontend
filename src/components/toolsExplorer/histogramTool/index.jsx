import React, {useState} from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography, Button, TextField, Box, Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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
          <Box>
            <Grid container rowSpacing={{ xs: 3 }} sx={{p: 4}}>
              Histogram Instrument Types:
              <Grid item xs={12}>
                <Item>
                  <Buttons handleSubmit={handleSubmit}/>
                </Item>
              </Grid>
              <Grid item xs={12}>
                Result:
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
  const [instrumentType, setInstrumentType] = useState("FEGS");
  const handleInstrumentType = (event) => {
    if (event.target.value) {
      setInstrumentType(event.target.value)
    }
  }
  return (
        <Box sx={{m: 2}}>
          <Box sx={{mb: 1}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Instrument Type</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={instrumentType}
                  label="Instrument Type"
                  onChange={handleInstrumentType}
                >
                  <MenuItem value={"FEGS"}>FEGS</MenuItem>
                  <MenuItem value={"LIP"}>LIP</MenuItem>
                  <MenuItem value={"CRS"}>CRS</MenuItem>
                  <MenuItem value={"CPL"}>CPL</MenuItem>
                </Select>
              </FormControl>
          </Box>
          <Box className="center_horizontally_child">
              <Button variant="outlined" color="primary" onClick={() => props.handleSubmit(instrumentType)}> Submit </Button>
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

