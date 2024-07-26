import { configureStore } from '@reduxjs/toolkit'
import cesiumViewerReducer from '../components/cesiumViewer/cesiumViewerSlice'

export const store = configureStore({
  reducer: {
    flight: cesiumViewerReducer
  },
})