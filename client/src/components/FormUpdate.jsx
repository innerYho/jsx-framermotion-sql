import axios from "axios"
import { useState, useEffect } from "react"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import dotenv from 'dotenv';

export default function FormUpdate({ medida, last_volume, setAvailablemm,
    setActivate,
    // setPorcWater,
    url }) {
    const [in_add, setIn_add] = useState('');

    const sendForm = async (e) => {
        try {
            var transMedida
            e.preventDefault()
            // e.target.reset()
            //transformar a mm3
            medida === 'mm' ? transMedida = in_add * 1
                : medida === 'cm' ? transMedida = in_add * 1000
                    : transMedida = in_add * 1000000
            // console.log(in_add)

            var newVolume = last_volume + transMedida
            if (newVolume >= 30000) {
                Swal.fire("error", "No es posible pasar la medida del tanque")
            } else {

                let res = await axios.post(`${url}/create`, {
                    wtr_id: null,
                    wtr_volume_mlt: transMedida,
                    wtr_add_remove: 1,
                    // wtr_date: Date.now(),
                    wtr_last_volume: newVolume
                });
                setAvailablemm(newVolume)
                setActivate(true)
                Swal.fire(res.data.err ? res.data.err : res.data.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h3>Agregar </h3>
            <form onSubmit={sendForm}>
                <div className="form-group col-md-4">
                    <input type="text" className='form-control mb-4 in_add' id='in_add' onChange={(e) => setIn_add(e.target.value)} />
                    <label htmlFor="in_add">{medida}</label>
                </div>

                <button
                    className="form-control btn btn-outline-danger p-10"
                    type="submit"
                >
                    Guardar
                </button>
            </form>
        </>
    )
}