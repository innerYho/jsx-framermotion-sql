import { useEffect, useState } from 'react'

import Water from './pages/Water'

function App() {
  // equitativos de los valores
  // 1mm3 = 0.001cm3
  // 1ltr = 1000cm3
  // 1ltr = 1.000.000mm3

  // % water
  // 30cm3 = 30.000 mm3 = maxTotalmm

  return (
    <div className="App">
      <h1>Almacenamiento de agua</h1>

      <Water
      // medida={medida} last_volume={availablemm} url={url} 
      />
    </div>
  )
}

export default App
