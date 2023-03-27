import FormUpdate from "../components/FormUpdate";
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { motion, useTransform, useMotionValue, color } from 'framer-motion'
import axios from "axios"
import Swal from "sweetalert2";

export default function Water(
    // { medida, last_volume, url }
) {

    const [volumeCm3, setVolumeCm3] = useState(0)
    const maxTotalmm = useState(30000)
    const maxTotallt = useState(0.03)
    const maxTotalcm = useState(30)
    const [totalVolume, setTotalVolume] = useState('');
    const [medida, setMedida] = useState("cm");

    const url = "http://localhost:9876"
    const [data, setData] = useState([]);
    const [availablemm, setAvailablemm] = useState(0);
    const [porcWater, setPorcWater] = useState('');
    const [activate, setActivate] = useState(false);

    const y = useMotionValue(0)
    const backgroundColor = useTransform(y, [-100, 0, 100], ['#fff', '#999', '#000'])

    const searchData = async (e) => {
        try {
            // e.preventDefault();
            // e.event.stopPropagation();
            var tempVol
            let res = await axios.get(`${url}/search`)
            if (res.data.rows.length === 0) {
                setData([])
            }
            else {
                setData(res.data.rows)
                tempVol = res.data.rows[0].wtr_last_volume
                setAvailablemm(tempVol)

                console.log(data)

                volumeWate(tempVol)
                Swal.fire(res.data.err ? res.data.err : res.data.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // searchData()
    if (activate == true) {
        searchData()
    }

    const volumeWate = (e) => {
        var tempVol = e

        setPorcWater(
            tempVol < 2000 ?
                '64' : (tempVol >= 2001 && tempVol <= 5000) ? '54'
                    : (tempVol >= 5001 && tempVol <= 8000) ? '34'
                        : (tempVol >= 8001 && tempVol <= 10000) ? '24'
                            : (tempVol >= 10001 && tempVol <= 12000) ? '14'
                                : (tempVol >= 12001 && tempVol <= 15000) ? '-14'
                                    : (tempVol >= 15001 && tempVol <= 18000) ? '-24'
                                        : (tempVol >= 18001 && tempVol <= 20000) ? '-24'
                                            : (tempVol >= 20001 && tempVol <= 24000) ? '-44'
                                                : (tempVol >= 24001 && tempVol <= 27000) ? '-54'
                                                    : '-67'
        )
        setActivate(false)
    }

    // searchData()
    useEffect(() => {
        searchData()
        console.log(data)
    }, [])

    // framer-motion
    const variantsPorcent = {
        porcent: {
            background: '#fff',
            scale: 0.00008 * availablemm,
            transition: { duration: 1 },
            y: '120px',
            x: '50px'
        }
    }

    return (
        <>
            <div className="row">



                <div className="form-group col-md-12">
                    <motion.div className='box' style={{ marginTop: '-200px' }}
                        initial={{ scale: 1, opacity: 0.5 }} transition={{ duration: 1, }}
                        animate={{
                            y: ['100px', '0px', '100px'], opacity: 0.8,
                            scale: [1, 2],
                            // borderRadius: ["20%", "25%"]
                        }} >

                        <motion.button className=''
                            style={{
                                backgroundColor: '#07538c',
                                color: '#ccc',
                                fontSize: '12px'
                            }}
                            animate={{
                                y: ['65px', `${porcWater}px`], opacity: 0.8,
                            }}
                            drag='y'
                            dragConstraints={{ //movimiento máximo permitido
                                top: -100, bottom: 0
                            }}>
                            Nivel del agua
                            {/* {availablemm} */}
                            {availablemm == 0 ? 0 :
                                (medida === "cm") ?
                                    <>
                                        <label className="lblWater"> {availablemm / 1000} cm</label>
                                        <sup>3</sup>
                                    </>
                                    : (medida === "mm") ?
                                        <>
                                            <label> {availablemm / 1000} mm</label>
                                            <sup>3</sup>
                                        </>
                                        :
                                        <label> {availablemm / 1000} ltrs</label>
                            }
                        </motion.button>
                    </motion.div>

                </div>

                <div className="form-group col-md-12 card" style={{ marginTop: '400px' }}>
                    <label>Capacidad total :
                        <strong>
                            {(medida === "cm") ?
                                <>
                                    <label>30 cm</label>
                                    <sup>3</sup>
                                </>
                                : medida === "mm" ?
                                    <>
                                        <label>30000 mm</label>
                                        <sup>3</sup>
                                    </>
                                    :
                                    <>
                                        <label>0.03 ltr</label>
                                        <sup>3</sup>
                                    </>
                            }
                        </strong>
                    </label>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="">Disponibilidad :  <strong>
                        {availablemm == 0 ? 0
                            : (medida === "cm") ?
                                <>
                                    <label>{availablemm / 1000} cm</label>
                                    <sup>3</sup>
                                </>
                                : (medida === "mm") ?
                                    <>
                                        <label>{availablemm / 1000} mm</label>
                                        <sup>3</sup>
                                    </>
                                    :
                                    <label>{availablemm / 1000} ltrs</label>
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


            </div>
            {/* <h2>from pages</h2> */}
            <FormUpdate medida={medida} last_volume={availablemm} setAvailablemm={setAvailablemm}
                setActivate={setActivate}
                // setPorcWater={setPorcWater}
                url={url} />
        </>
    )
}