import axios from "axios"
import { useState, useEffect } from "react"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import dotenv from 'dotenv';

export default function FormUpdate({ medida, url }) {
    // const navigate = useNavigate()
    // dotenv.config({ path: ".env" })
    // const key = process.env.API_KEY;
    // console.log(process.env.URL)

    const [in_add, setIn_add] = useState('');

    const sendForm = async (e) => {
        try {
            e.preventDefault()
            // e.target.reset()
            // let res = await axios.post(`config.urlServer`,{
            let res = await axios.post(`${url}`, {
                // wtr_id: ,
                wtr_volume_mlt: 1,
                wtr_add_remove: 1,
                // wtr_date: ,
                wtr_last_volume: 1
            });
            Swal.fire(res.data.err ? res.data.err : res.data.msg);

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h3>Agregar </h3>
            <form onSubmit={sendForm}>
                <input type="text" className='form-control mb-4 in_add' id='in_add' onChange={(e) => setIn_add(e.target.value)} />
                <label htmlFor="">{medida}</label>
                {/* <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button> */}
                <button
                    className="form-control btn btn-outline-danger"
                    type="submit"
                >
                    Guardar Actualización
                </button>
            </form>
        </>
    )
}