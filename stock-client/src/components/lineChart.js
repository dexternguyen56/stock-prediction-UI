import React from "react"
import {Line} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"



function LineChart({chartData,title}){

    let option = {
        maintainAspectRatio: false,
        scales:{
            x: {
              
                ticks:{
                    maxTicksLimit: 7,
                    maxRotation: 20,
               
 
                },
                title:{
                    display: true,
                    text: 'Date',
                    font: {
                        size: 15,
                    },
                    color: '#000'
       
                }
            },

            y:{
                title:{
                    display: true,
                    text: 'Price',
                    font: {
                        size: 15,
                  
                    },
                    color: '#000'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text:  {title}["title"],
                font: {
                    size: 15,
              
                }
            },
            legend:{
                position : 'right',
                align: 'center',
                fill : true
            }
         
            

        },
        tooltips: {
            intersect: false,
            mode: "index"
        },
        hover: {
            mode: 'index',
            intersect: true
        },
        interaction: {
            mode: 'index',
            axis: 'x',
            intersect: true
        },
        responsiveAnimationDuration: 500,
        responsive: true
          
    }



    return <Line  data={chartData} options={option}/>
}

export default LineChart