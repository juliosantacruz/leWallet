import React, { useEffect, useState } from 'react'


type Coordenadas = {
  latitud:number | null,
    longitud:number | null,
    error:string | null
}



export default function ExpenseDetails() {
  const [coordenadas, setCoordenadas] = useState<Coordenadas>({
    latitud:null,
    longitud:null,
    error:null
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoordenadas({
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
          error: null,
        });
      },
      error => {
        setCoordenadas({
          error: error.message,
          latitud: null,
          longitud: null,
        });
      }
    );
  }, []);

  return (
    <div>
      <h3>Soy un test </h3>
      <div>
      <BotonCoordenadas onClick={() => {}} />
      {coordenadas.error && <p>Error: {coordenadas.error}</p>}
      {coordenadas.latitud && <p>Latitud: {coordenadas.latitud}</p>}
      {coordenadas.longitud && <p>Longitud: {coordenadas.longitud}</p>}
    </div>
    </div>
  )
}



const BotonCoordenadas = ({onClick}) => {
  return(
    <button onClick={onClick}>Obtener Cooredenadas</button>
  )
}