import * as React from 'react';
import { TopBar } from './topBar';
import { FCXViewer } from '../cesiumViewer';

function Home() {
  return (
    <div>
      <TopBar/>
      <FCXViewer/>
    </div>
  );
}
export default Home;