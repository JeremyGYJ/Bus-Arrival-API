import React, {useState, useEffect} from 'react';

function BusService ({busArrivalData}){
  return(
    <ul>
      {busArrivalData.services.map((service) => {
        const result = service.next_bus_mins < 0 ? 'Arrived': `${service.next_bus_mins} minutes`;
          return(
            <li key={service.bus_no}>
              Bus {service.bus_no}: {result}
            </li>
          
          );
          })}
        </ul>
  )
}

     {/* //Functoin to fetch bus arrival data based on API */}
      async function fetchBusArrival(id){
        const response = await fetch(`https://sg-bus-arrivals-sigma-schoolsc1.replit.app/?id=${id}`);
    const data = await response.json();
      return data;
      }

      function App(){
        const [busStopId, setBusStopId] = useState('');
      
        const [busArrivalData, setBusArrivalData] = useState('null');
      
        const [loading, setLoading] = useState(false);
      
      
 {/* Fetch bus arrival data on-the-fly as the user types in the bus stop id  */}
      if(busStopId){
        setLoading(true);
      fetchBusArrival(busStopId)
      .then((data) => setBusArrivalData(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      }

      function handleInputChange(event){
        setBusStopId(event.target.value)
      }

    return(
      <div>
      <h1>Bus Arrival App </h1>
        <input type="text" value={busStopId}
          onChange={handleInputChange}
          placeholder= 'Enter bus stop id'/>
        
        {loading && <p> Loading ...</p>}
        {busArrivalData && busArrivalData.services &&(
  <>
  <h2>Bus Stop {busArrivalData.bus_stop_id}</h2>
    <BusService busArrivalData={busArrivalData}/>
  </>
        )}
      </div>
    )
}
      export default App;