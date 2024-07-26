import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  altitude: [],
  datetime: [],
  currentValue: null,
  currentAltitude: null,
  currentDateTime: null
}

export const cesiumViewerSlice = createSlice({
  name: 'cesiumViewer',
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.value.push(action.payload.value);
      state.currentValue = action.payload.value;

      state.altitude.push(action.payload.altitude);
      state.currentAltitude = action.payload.altitude;
      
      state.datetime.push(action.payload.datetime);
      state.currentDateTime = action.payload.datetime;
    },
    updateValue: (state, action) => {
      state.value.push(action.payload);
    },
    updateAltitude: (state, action) => {
      state.altitude.push(action.payload);
    },
    updateDateTime: (state, action) => {
      state.datetime.push(action.payload);
    }
  }
});

// actions
export const { updateData, updateValue, updateAltitude, updateDateTime } = cesiumViewerSlice.actions;

// reducer
export default cesiumViewerSlice.reducer;