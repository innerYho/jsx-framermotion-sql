import { useEffect, useState } from 'react'
import axios from "axios"

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
  const [availablemm, setAvailablemm] = useState('');
  const y = useMotionValue(0)
  const backgroundColor = useTransform(y, [-100, 0, 100], ['#fff', '#999', '#000'])

  const searchData = async (e) => {
    try {
      e.preventDefault();
      // e.event.stopPropagation();
      // e.target.reset()
      let res = await axios.get(`${url}/search`)
      if (res.data.rows.length === 0) {
        setData([])
      }
      else {
        setData(res.data.rows)
        setAvailablemm(res.data.rows[0].wtr_last_volume)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    searchData()

    console.log(data)
  }, [data])


  // 1mm3 = 0.001cm3
  // 1ltr = 1000cm3
  // 1ltr = 1.000.000mm3
  return (
    <div className="App">
      <div className="row">

        <h1>Almacenamiento de agua</h1>


        <div className="form-group col-md-4">
          <motion.div className='box' style={{ marginTop: '100px' }}
            initial={{ scale: 1, opacity: 0.5 }} transition={{ duration: 1, }}
            animate={{
              y: ['100px', '0px', '100px'], opacity: 1,
              scale: [1, 2],
              // borderRadius: ["20%", "25%"]
            }} ></motion.div>

          {/* <motion.div
            transition={{ duration: 1, type: 'tween', }}
            animate={{
              y: '100px'
            }}
          >
            Weeee I'm animated
          </motion.div> */}




        </div>
        {/* <div className="card"> */}
        <div className="form-group col-md-4 card">
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
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="">Disponibilidad :  <strong>
            {availablemm == 0 ? 0
              : (medida === "cm") ?
                availablemm / 1000
                : (medida === "mm") ?
                  availablemm
                  : availablemm / 1000000
            }
          </strong></label>
        </div>

        <div className="form-group col-md-4">
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
        {/* </div> */}

        <Water medida={medida} last_volume={availablemm} url={url} />
      </div>

    </div>
  )
}

export default App
