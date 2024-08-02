import { useState } from 'react';
import Styled from "styled-components";

import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

export const Container = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1rem;
`;

export function TrackFlightSwitch({checked, setChecked}) {
  return (
    <Container>
      <div>
        <Switch
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
      <Typography variant="body2" display="block">
          Track Aircraft
      </Typography>
    </Container>
  );
}