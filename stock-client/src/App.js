import React,{useState,useEffect, useRef} from 'react'
import moment from "moment"
import LineChart from './components/lineChart';
import axios from 'axios';
import "./styles.css"




function App() {
  // const data = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       label: "First dataset",
  //       data: [33, 53, 85, 41, 44, 65],
  //       fill: true,
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderColor: "rgba(75,192,192,1)"
  //     },
  //     {
  //       label: "Second dataset",
  //       data: [33, 25, 35, 51, 54, 76],
  //       fill: false,
  //       borderColor: "#742774"
  //     }
  //   ]
  // };
  
  const api = "http://127.0.0.1:5000/"

  //const api = "http://127.0.0.1:5000"
  const [chartData, setChartData] = useState([]);
  const [ticker,setTicker] = useState("GOOGL")
  const [title,setTitle]= useState(ticker)
  const [load,setLoad] = useState(true)


  

  const chart = () =>{
    setLoad(true)
    fetch(api + "/home")
    .then((res) => res.json())
    .then((data) => {

      format_chartData(data)
      setLoad(false)
    });
  }

  const format_chartData = (data) =>{

    // console.log(Object.entries(data))
    // console.log(Object.entries(data["0"]))


    let time = Object.entries(data).map(([id]) => (moment(id).format('YYYY-MM-DD')))
    let predicted = Object.entries(data).map(([id,item]) => (item.Predicted))
    let actual = Object.entries(data).map(([id,item]) => (item.Actual))
    setChartData({
      labels: time,
      datasets: [
        {
          label: "Predicted",
          data: predicted,
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: "Actual",
          data: actual,
          fill: false,
          borderColor: "#742774"
        }
      ]
    })

  }


const sendTicker = () =>{
  axios.get(api+'symbol',{
    params:{
      ticker: ticker
    }
})
  .then(function (response) {
    format_chartData(response.data)
    setTitle(ticker)
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}




  useEffect(() => {
    chart()
  },[]);

  if(load){
    return <div>Loading...</div>
  }

  const something=(event)=> {

    if (event.key === "Enter") {
        sendTicker()
    }
}
  
  

  return (
    <div className="App">
      <div  style={{display:"flex",justifyContent:"center"}}> 
      <label >Ticker&emsp;
        <input 
          type="text" 
          value={ticker}
           onChange={(e) => setTicker(e.target.value)}
          onKeyDown={(e) => something(e) }
        />
       
      </label>
      <button type="button" onClick={sendTicker} className="button-80">Change</button>
  
   
      </div>
  
        
    

       <LineChart  chartData={chartData} title ={title}  />
    </div>
  )
}

export default App
