import React, { Suspense } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import RenderRouter from './routes'; 
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import PageLoading from './pages/loading.jsx';
import { useDispatch } from "react-redux";
import { getInitData } from "./stores/auth";


function App() {
  const dispatch = useDispatch();
  dispatch(getInitData());
  return (

    <div className="App">
      <Suspense fallback={<PageLoading />}>
        <Router>
          <RenderRouter />
        </Router>
      </Suspense>
    </div>
   
  )
}

export default App;
library.add(fab, fas, far);