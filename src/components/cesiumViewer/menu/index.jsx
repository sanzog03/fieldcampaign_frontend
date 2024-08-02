import { useState} from 'react';
import Menu from '@mui/material/Menu';
import FlightTakeoffTwoToneIcon from '@mui/icons-material/FlightTakeoffTwoTone';
import Typography from '@mui/material/Typography';

import { TrackFlightSwitch } from "./helpers/trackFlight";

import "./index.css";

export function MapMenu({trackAircraft, setTrackAircraft}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="map-menu">
      <div
        id="map-icon"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FlightTakeoffTwoToneIcon/>
      </div>
      <Menu
        id="map-basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div id="map-menu-items">
          <Typography variant="h7" component="div">
            Aircraft Controls
          </Typography>
          <TrackFlightSwitch checked={trackAircraft} setChecked={setTrackAircraft}/>
        </div>
      </Menu>
    </div>
  );
}