import { useEffect, useState } from 'react'

import { motion, useTransform, useMotionValue } from 'framer-motion'
import Water from './pages/Water'

function App() {

  const [count, setCount] = useState(0)
  const [volumeCm3, setVolumeCm3] = useState(0)
  const maxTotalmm = useState(30000)
  const maxTotallt = useState(0.03)
  const maxTotalcm = useState(30)
  const [totalVolume, setTotalVolume] = useState('');
  const [medida, setMedida] = useState("cm");

  const url = "http://localhost:9876"
  const [data, setData] = useState([]);

  const y = useMotionValue(0)
  const backgroundColor = useTransform(y, [-100, 0, 100], ['#fff', '#999', '#000'])


  // useEffect(() => {
  //   try {
  //     e.preventDefault()
  //     // e.target.reset()
  //     let res = await.axios.get(`${url}/searchAll`)
  //     if (res.data.rows.length === 0) {
  //       setData([])
  //     }
  //     else {
  //       setData(res.data.rows)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  return (
    <div className="App">
      <h1>Almacenamiento de agua</h1>

      <div>
        <motion.div className='box' style={{ marginTop: '100px' }}
          initial={{ scale: 1 }} transition={{ duration: 1 }}
          animate={{
            scale: [1, 2],
            // rotate: [0, 90],
            borderRadius: ["20%", "25%"]
          }} ></motion.div>


        {/* <motion.div
          style={{ backgroundColor, y }}
          className='box' drag='y'
          dragConstraints={{
            top: -100,
            bottom: 100
          }}
        /> */}




      </div>
      <div className="card">
        <div className="row">
          <div className="form-group col-md-4">
          </div>
        </div>

        <label>Capacidad total :
          <strong>
            {
              (medida === "cm") ?
                <>
                  {maxTotalcm} cm <sup>3</sup>
                </>
                : medida === "mm" ?
                  <>
                    {maxTotalmm} mm <sup>3</sup>
                  </>
                  :
                  <>
                    {maxTotallt} lts
                  </>
            }
          </strong>
        </label>
        <label htmlFor="">Disponibilidad :  <strong>

        </strong></label>

        <div>
          <label htmlFor="">Medida : </label>

          <select className="form-select form-control" id="slt_medida" value={medida}
            onChange={(e) => setMedida(e.target.value)}>
            <option value="cm">Centimetros cúbicos</option>
            <option value="mm">Milimetros cúbicos</option>
            <option value="lt">Litros</option>
          </select>
        </div>

        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      </div>

      <Water medida={medida} url={url} />
    </div>
  )
}

export default App
