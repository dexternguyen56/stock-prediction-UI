import React,{useState,useEffect} from 'react'
import moment from "moment"
import LineChart from './components/lineChart';
import axios from "axios"


function App() {

  const [chartData, setChartData] = useState([]);

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

  const chart = () =>{
    let time = []
    let predicted = []
    let actual = []
    fetch("/home")
    .then((res) => res.json())
    .then((data) => {
      //console.log(Object.entries(data))
  
        time = Object.entries(data).map(([id]) => (moment(id).format('YYYY-MM-DD')))
        predicted = Object.entries(data).map(([id,item]) => (item.Predicted))
        actual = Object.entries(data).map(([id,item]) => (item.Actual))

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


    });
  }

  useEffect(() => {
    chart()
  },[]);


  console.log(chartData)

  return (
    <div className="App">
       <LineChart chartData={chartData}  />
    </div>
  )
}

export default App
