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
    const y = useMotionValue(0)
    const backgColor = useTransform(y, [-100, 0, 100], ['#fff', '#999', '#000'])

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


    // framer-motion
    const [counter, setCounter] = useState(0);
    const variants = {
        odd: {
            backgroundColor: '#07538c',
            color: '#ccc',
            scale: 1.7,
            transition: { duration: 2 },
            // drag: 'x',
            // dragConstraints: { right: 0, left: -1100 },
            // dragTransition: { bounceStiffness: 600, bounceDamping: 8 }
        },
        even: {
            backgroundColor: '#098ef2',
            color: '#000',
            // scale: 1.1,
            scale: 0.2,
            transition: { duration: 1 }
        }
    }
    const variantsPorcent = {
        porcent: {
            backgColor,
            // background: '#fff',
            scale: 0.00008 * availablemm,
            transition: { duration: 1 },
            y: '120px',
            x: '50px'

        }
    }

    // const button = {
    //     rest: { scale: 1 },
    //     hover: { scale: 1.1 },
    //     pressed: { scale: 0.95 }
    // };
    // const arrow = {
    //     rest: { rotate: 0 },
    //     hover: { rotate: 360, transition: { duration: 0.4 } }
    // };

    const x = useMotionValue(0);
    const xInput = [-100, 0, 100];
    const background = useTransform(x, xInput, [
        "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
        "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
        "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"
    ]);
    const color = useTransform(x, xInput, [
        "rgb(211, 9, 225)",
        "rgb(68, 0, 255)",
        "rgb(3, 209, 0)"
    ]);
    const tickPath = useTransform(x, [10, 100], [0, 1]);
    const crossPathA = useTransform(x, [-10, -55], [0, 1]);
    const crossPathB = useTransform(x, [-50, -100], [0, 1]);

    return (
        <>
            <div className="row">



                <div className="form-group col-md-4">
                    {/* <motion.div className='box' style={{ marginTop: '100px' }}
                        initial={{ scale: 1, opacity: 0.5 }} transition={{ duration: 1, }}
                        animate={{
                            y: ['100px', '0px', '100px'], opacity: 1,
                            scale: [1, 2],
                            // borderRadius: ["20%", "25%"]
                        }} ></motion.div> */}

                    {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <motion.div className='box' variants={variants}
                            animate={counter % 2 === 0 ? 'even' : 'odd'}
                        >
                            {counter}
                            animate={availablemm % 2 === 0 ? 'even' : 'odd'} >
                            {availablemm}
                        </motion.div>
                        <button onClick={() => setCounter(counter => counter + 1)}>Dale</button>
                    </div> */}


                    {/* <motion.div variants={variantsPorcent}
                        animate={'porcent'}
                    >
                        <motion.button

                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 1, }}
                        >
                            Nivel del agua
                        </motion.button>
                    </motion.div> */}

                    <div>
                        <motion.div className='box'
                            drag='y'
                            dragConstraints={{ //movimiento máximo permitido
                                top: -100, bottom: 0
                            }}></motion.div>
                    </div>

                    {/* <motion.div
                        className="refresh"
                        //   onClick={onClick}
                        variants={button}
                        initial="rest"
                        whileHover="hover"
                        whileTap="pressed"
                    >
                        <motion.svg
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                            variants={arrow}
                        >
                            <path
                                d="M12.8 5.1541V2.5a.7.7 0 0 1 1.4 0v5a.7.7 0 0 1-.7.7h-5a.7.7 0 0 1 0-1.4h3.573c-.7005-1.8367-2.4886-3.1-4.5308-3.1C4.8665 3.7 2.7 5.85 2.7 8.5s2.1665 4.8 4.8422 4.8c1.3035 0 2.523-.512 3.426-1.4079a.7.7 0 0 1 .986.9938C10.7915 14.0396 9.2186 14.7 7.5422 14.7 4.0957 14.7 1.3 11.9257 1.3 8.5s2.7957-6.2 6.2422-6.2c2.1801 0 4.137 1.1192 5.2578 2.8541z"
                                fill="#fff"
                                fillRule="nonzero"
                            />
                        </motion.svg>
                    </motion.div> */}

                    {/* <motion.div className="example-container" style={{ background }}>
                        <motion.div
                            className="box"
                            style={{ x }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                        >
                            <svg className="progress-icon" viewBox="0 0 50 50">
                                <motion.path
                                    fill="none"
                                    strokeWidth="2"
                                    stroke={color}
                                    d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                                    style={{ translateX: 5, translateY: 5 }}
                                />
                                <motion.path
                                    fill="none"
                                    strokeWidth="2"
                                    stroke={color}
                                    d="M14,26 L 22,33 L 35,16"
                                    strokeDasharray="0 1"
                                    style={{ pathLength: tickPath }}
                                />
                                <motion.path
                                    fill="none"
                                    strokeWidth="2"
                                    stroke={color}
                                    d="M17,17 L33,33"
                                    strokeDasharray="0 1"
                                    style={{ pathLength: crossPathA }}
                                />
                                <motion.path
                                    fill="none"
                                    strokeWidth="2"
                                    stroke={color}
                                    d="M33,17 L17,33"
                                    strokeDasharray="0 1"
                                    style={{ pathLength: crossPathB }}
                                />
                            </svg>
                        </motion.div>
                    </motion.div> */}

                </div>

                <div className="form-group col-md-4 card" style={{ marginTop: '450px' }}>
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