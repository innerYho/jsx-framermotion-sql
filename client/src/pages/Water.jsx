import FormUpdate from "../components/FormUpdate";
import { useParams } from 'react-router-dom'
import { useState } from "react";

export default function Water({ medida, url }) {

    return (
        <>
            <h2>from pages</h2>
            <FormUpdate medida={medida} url={url} />
        </>
    )
}