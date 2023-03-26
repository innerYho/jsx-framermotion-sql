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
    const [availablemm, setAvailablemm] = useState('');
    const [porcWater, setPorcWater] = useState('');

    const y = useMotionValue(0)
    const backgroundColor = useTransform(y, [-100, 0, 100], ['#fff', '#999', '#000'])

    const searchData = async (e) => {
        try {
            // e.preventDefault();
            // e.event.stopPropagation();
            // e.target.reset()
            let res = await axios.get(`${url}/search`)
            if (res.data.rows.length === 0) {
                setData([])
            }
            else {
                setData(res.data.rows)
                setAvailablemm(res.data.rows[0].wtr_last_volume)
                console.log(data)
                Swal.fire(res.data.err ? res.data.err : res.data.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // searchData()
    useEffect(() => {
        searchData()
        console.log(data)
    }, [])

    useEffect(() => {
        // Porcentaje nivel del agua
        console.log(availablemm)

        setPorcWater(
            availablemm < 2000 ?
                '64'
                // : (availablemm >= 2001 && availablemm <= 5000) ? '54'
                // : (availablemm >= 5001 && availablemm <= 8000) ? '34'
                // : (availablemm >= 8001 && availablemm <= 10000) ? '24'
                //     : (availablemm >= 10001 && availablemm <= 12000) ? '14'
                //         : (availablemm >= 12001 && availablemm <= 15000) ? '-14'
                //             : (availablemm >= 15001 && availablemm <= 18000) ? '-24'
                //                 : (availablemm >= 18001 && availablemm <= 20000) ? '-24'
                //                     : (availablemm >= 20001 && availablemm <= 24000) ? '-44'
                //                         : (availablemm >= 24001 && availablemm <= 27000) ? '-54'
                : '-67'
        )
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
                            }}
                            animate={{
                                y: ['65px', `${porcWater}px`], opacity: 0.8,
                            }}
                            drag='y'
                            dragConstraints={{ //movimiento máximo permitido
                                top: -100, bottom: 0
                            }}>
                            Nivel del agua

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


            </div>
            <h2>from pages</h2>
            <FormUpdate medida={medida} last_volume={availablemm} setAvailablemm={setAvailablemm} url={url} />
        </>
    )
}