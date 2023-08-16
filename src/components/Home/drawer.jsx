import * as React from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const drawerWidth = 240;

export function ClippedDrawer(props) {
  /**
   * A custom ClippedDrawer component that displays a permanent drawer with radio buttons for selecting visualization types.
   *
   * @component
   * @param {Object} props - Component props
   * @param {string[]} props.visualizationTypes - An array of available visualization types.
   * @param {function} props.setVisualization - A function to set the selected visualization type.
   * @returns {JSX.Element} ClippedDrawer component
   */

  const [value, setValue] = React.useState(props.visualizationTypes[0]);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.setVisualization(event.target.value);
  };

  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Container>
          <Box mt={4} sx={{ overflow: 'auto' }}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Visualizations</FormLabel>
              <Box mt={2}>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                  mt={2}
                >
                {
                  props.visualizationTypes.map((type) => (
                    <FormControlLabel value={type} control={<Radio />} label={type} />
                  ))
                }
              </RadioGroup>
            </Box>
          </FormControl>
          </Box>
        </Container>
      </Drawer>
  );
}
