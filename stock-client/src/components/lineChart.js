import React from "react"
import {Line} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"




function LineChart({chartData,title}){
    // var ticker_info =

    // const getTile = () =>{
    //     axios.post('/title',{
    //       ticker: {ticker},
    //       option: 1
    //   })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   }
      
    let option = {
        scales:{
            x: {
            
                ticks:{
                    maxTicksLimit: 7
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text:  {title}["title"]
            }
        }
    }


    return <Line  data={chartData} options={option} />
}

export default LineChart