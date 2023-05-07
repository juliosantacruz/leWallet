// import MapViewer from '@/components/MapViewer/MapViewer'
import React, { useEffect, useRef, useState } from 'react'
import dynamic from "next/dynamic"



type Coordenadas = {
  latitud:number | null,
    longitud:number | null,
    error:string | null
}

const MapViewer = dynamic(() => import("../../../components/MapViewer/MapViewer"), { ssr:false })


export default function ExpenseDetails() {
  const [coordenadas, setCoordenadas] = useState<any>([22.509,-126.8726 ])

  
const handleClick = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      setCoordenadas([
        position.coords.latitude,position.coords.longitude
      ] );
    },
    error => {
      console.log(error.message)
    },
    {enableHighAccuracy: true,  timeout: 10000,  }
  );
}

  return (
    <div>
      <h3>Soy un test </h3>
      <div>
      <button onClick={handleClick}>Obtener Cooredenadas</button>
      {/* {coordenadas.error && <p>Error: {coordenadas.error}</p>}
      {coordenadas.latitud && <p>Latitud: {coordenadas.latitud}</p>}
      {coordenadas.longitud && <p>Longitud: {coordenadas.longitud}</p>} */}
    </div>

    <MapViewer coordinates={coordenadas}  />
    </div>
  )
}


