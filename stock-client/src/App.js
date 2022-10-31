import React,{useState,useEffect, useRef} from 'react'
import moment from "moment"
import LineChart from './components/lineChart';
import TableChart from './components/TableChart';
import axios from 'axios';
import "./styles.css"


const testData = [
  {
    Feature: 'H-Low',
    EMA: '0',
    RMSE: '0',
    R2 : '0'
  },
  {
    Feature: 'H-EMA',
    EMA: '0',
    RMSE: '0',
    R2 : '0'
  }
];



function App() {


  
  //const api = "http://stockprediction-env.eba-xfsucpdb.us-west-1.elasticbeanstalk.com/"

  const api = "http://127.0.0.1:5000"
  const [chartData, setChartData] = useState(testData);
  const [stockMetrics, setStockMetrics] = useState(testData);
  const [ticker,setTicker] = useState("GOOGL")
  const [ema,setEMA] = useState("5")
  const [title,setTitle]= useState("Alphabet Inc.")
  const [load,setLoad] = useState(true)


  

  const chart = () =>{
    setLoad(true)
    fetch(api + "/home")
    .then((res) => res.json())
    .then((data) => {

      format_chartData(data)
      getStockInfo()
      getStockMetrics()
      setLoad(false)
    });
  }

  const format_chartData = (data) =>{


    let time = Object.entries(data).map(([id]) => (moment(id).format('MM/DD/YY')))
    let predicted = Object.entries(data).map(([id,item]) => (item.Predicted))
    let actual = Object.entries(data).map(([id,item]) => (item.Actual))
    let emaData = Object.entries(data).map(([id,item]) => (item.EMA))
    
    setChartData({
      labels: time,
      datasets: [

        {
          label: "Adj Close",
          data: actual,
          fill: false,
          borderColor: "#742774",
          backgroundColor:  "#742774",
          pointBackgroundColor: "#742774",
          pointBorderColor: "#000",
          pointBorderWidth: 0.2
        },

        {
          label: "High-Low",
          data: predicted,
          borderColor: "rgba(75,192,192,0.4)",
          backgroundColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "rgba(75,192,192,0.4)",
          pointBorderColor: "rgb(0,0,0,0.4)",
          pointBorderWidth: 0.2
        },


        {
          label: "High-EMA(" + ema +")",
          data: emaData,
          borderColor: 	"rgb(255,165,0,0.4)",
          backgroundColor:"rgb(255,165,0,1)", 
          pointBackgroundColor: "rgb(255,165,0,0.4)",
          pointBorderColor: "rgb(0,0,0,0.4)",
          pointBorderWidth: 0.2
        }
      ]
    })

  }


const sendTicker = () =>{
  axios.post(api+'/symbol',{
    params :{
    
      ticker: ticker,
      ema: ema
    }
    
})
  .then(function (response) {
    format_chartData(response.data)
    getStockInfo()
    getStockMetrics()
  })
  .catch(function (error) {
    console.log(error);
  });
}



const getStockInfo = () =>{
  axios.get(api+'/title',{
    params :{
      ticker: ticker
    }
})
  .then(function (response) {
    setTitle(response.data['title'])
  })
  .catch(function (error) {
    console.log(error);
  });
}

const getStockMetrics = () =>{
  axios.get(api+'/metrics',{
    params :{
      ticker: ticker
    }
})
  .then(function (response) {
    setStockMetrics(response.data['metrics'])
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
        getStockInfo()
    }
}

const handleStock =() => {
  sendTicker()
  getStockInfo()
  
}
  
  

  return (
    <div className="App">
      <div  style={{display:"flex",justifyContent:"center", color: "dodgerblue"}}> 
        <label >Ticker&emsp;
          <input 
            type="text" 
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            onKeyDown={(e) => something(e) }
          />
        
        </label>
        <button type="button" onClick={sendTicker} className="button-80">Change</button>
  
      </div>
      <div style={{"height": "420px"}}>
        <LineChart  chartData={chartData} title ={title}  />
       
      </div>

      <div  style={{"margin": "20px"}}>
        <TableChart stockMetrics={stockMetrics} />
      </div>
      

    </div>
  )
}

export default App
