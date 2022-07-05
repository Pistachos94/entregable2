import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
/* import useFetch from '../hooks/useFetch'; */
const Weather = () => {
    const [data,setData]= useState({});
    const [temperature,setTemperature]= useState(true); 
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
  
      const success =(pos) =>{
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b89ec11e4ba66046cd274649c970b77`)
        .then(res=> setData(res.data))
        setLoading(false)
      }
      navigator.geolocation.getCurrentPosition(success);
    },[])
    console.log(data)
    const celciusForm=(data?.main?.temp)-273.15;
    const celcius= celciusForm.toFixed(2); 

    const farenForm=1.8*celciusForm+32;
    const faren=farenForm.toFixed(2);
    return (
        <div>
            {loading === false ? (<>
                <div className="card ">
                <h2>Wheater App</h2>
                <p>{data?.name}, {data?.sys?.country}</p>
                
                <div className='row disflex'>
                    <div className="infoCont col-12">
                        <div className="img">
                        <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="" />
                        </div>
                        <p className="temperature colorBlack">{temperature ? (<>{celcius}°C</>): (<>{faren}°F</>) }</p>
                    </div>
                    <div className='infoCont col-12'>
                        <ul>
                            <li>
                                "{data.weather?.[0].description}"
                            </li>
                            <li>
                                <div className="icon">
                                <i className="fa-solid fa-cloud"></i>
                                </div>
                                
                                <span className='colorBlack'>
                                <span className='colorViolet'>Wind speed:</span> {data?.wind?.speed} m/s
                                </span>
                            </li>
                            <li>
                                <div className='icon'>
                                <i class="fa-solid fa-wind"></i>
                                </div>
                                
                                <span className='colorBlack'>
                                    <span className='colorViolet'>Clouds:</span> {data?.clouds?.all}%
                                </span>
                            </li>
                            <li>
                            <div className='icon'>
                                <i class="fa-solid fa-temperature-empty"></i>
                                </div>                               
                                <span className='colorBlack'>
                                    <span className='colorViolet'>Pressure:</span> {data?.clouds?.all}mb
                                </span>                             
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <button onClick={()=>setTemperature(!temperature)}> Degrees °F/°C</button>
                </div>
            </div>




            </>
            ): (<>
            <div id="loader">
                <div className="lds-roller" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div></>)}

        </div>
    );
};

export default Weather;