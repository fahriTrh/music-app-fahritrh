import './css/reset.css'
import './css/App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Album from './pages/Album'
import Artist from './pages/Artist'
import AudioPlayer from './components/AudioPlayer'

const App = () => {

  return (

    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/album/:id' element={<Album />}/>
        <Route path='/artist/:id' element={<Artist />}/>
      </Routes>
      <AudioPlayer />
    </>
  )
}

export default App