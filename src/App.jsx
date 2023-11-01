
import { Toaster } from 'react-hot-toast'
import './App.css'
import PictureGallery from './Components/PictureGallery/PictureGallery'

function App() {
  

  return (
    <div className='max-w-7xl mx-auto'>
      <PictureGallery />
      <Toaster />
    </div>
  )
}

export default App
