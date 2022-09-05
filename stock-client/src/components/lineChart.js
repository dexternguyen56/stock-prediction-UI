import React from "react"
import {Line} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"

function LineChart({chartData}){
    let option = {
        scales:{
            x: {
            
                ticks:{
                    maxTicksLimit: 7
                }
            }
        }
    }


    return <Line  data={chartData} options={option} />
}

export default LineChart