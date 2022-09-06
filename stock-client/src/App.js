import React,{useState,useEffect, useRef} from 'react'
import moment from "moment"
import LineChart from './components/lineChart';
import axios from 'axios';
import "./styles.css"


function App() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  const [chartData, setChartData] = useState([data]);
  const [ticker,setTicker] = useState("")


  

  const chart = () =>{

    fetch("/home")
    .then((res) => res.json())
    .then((data) => {
      format_chartData(data)
      
        // time = Object.entries(data).map(([id]) => (moment(id).format('YYYY-MM-DD')))
        // predicted = Object.entries(data).map(([id,item]) => (item.Predicted))
        // actual = Object.entries(data).map(([id,item]) => (item.Actual))
        

        // setChartData({
        //   labels: time,
        //   datasets: [
        //     {
        //       label: "Predicted",
        //       data: predicted,
        //       borderColor: "rgba(75,192,192,1)"
        //     },
        //     {
        //       label: "Actual",
        //       data: actual,
        //       fill: false,
        //       borderColor: "#742774"
        //     }
        //   ]
        // })
    });
  }

  const format_chartData = (data) =>{
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
  axios.post('/home',{
    ticker: ticker,
    option: 1
})
  .then(function (response) {
    format_chartData(response.data)
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}




  useEffect(() => {
    chart()
  },[]);

  return (
    <div className="App">
      <form style={{display:"flex",justifyContent:"center"}}>
      <label>Ticker&emsp;
        <input 
          type="text" 
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
       
      </label>
      <button type="button" onClick={sendTicker} className="button-80">Change</button>
    </form>
   
        
    

       <LineChart  chartData={chartData}  />
    </div>
  )
}

export default App
