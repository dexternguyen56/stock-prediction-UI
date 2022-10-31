
# 📈 Stock-Price-Prediction
<img width="919" alt="image" src="https://user-images.githubusercontent.com/58058227/198963637-740eed92-5915-4110-8ef7-0be04edcd566.png">



**Visualized stock prediction model with React and Three.js and deployed the ML server with Flask on Amazon EC2 and MongoDB**

An enhancement to the collaborative project to predict stock price using Regression and Neural Network Models.

**I'm working to fix some issue with SSL certificate and set up the server to listen to https correctly on AWS**

Group Project to predict stock price with K-nearest neighbors Regression (KNN), Linear Regression, and Long Short Term Memory (LSTM).
We decided to use the Pandas DataReader to download data based
on the stock ticker name from Yahoo Finances. For our project we decided to get stock
market values dating back from January 2017 to mid November in 2021 giving us a decent size of training and testing
data. We will be obtaining several attributes from this dataset:
Open, High, Low, Close, Volume and Adjusted Close. Open is
the opening price of the stock/ETF on a specific day and Close
is the closing price. High is the highest price that stock was
bought or sold for and Low is the lowest price the stock traded
for. Volume is the total amount of stocks traded that day. The
Adjusted Close is the more comprehensive closing value that
takes into account other forms of stock trading, like dividends
and rights offerings. We will be predicting the Adjusted Close with diffferent periods of EMAs.
The accuracy will be measured by: Mean Absolute Error (MEA), Root-Mean-Squared Error (RMSE), and Coefficient of Determination (R2)

# KNN-Regression
To reduce the complexity of the algorithm, I decided to
only use n = 2 features since all data points are located in
n-dimensional space. This program will test K-neighbor from 1 to 25 and refit
the model using negative MAE scoring  for the best result since further neighbors will introduce
more bias to the current price.

![image](https://user-images.githubusercontent.com/58058227/154827252-7ef82fd6-0cae-42d1-a1a2-d0f3e6bab524.png)
<hr>
<img src="https://user-images.githubusercontent.com/58058227/154827307-e6949b5d-31df-4a70-9d88-5fc5f0f7d3f9.png" style="width=300px;height:auto;">

https://github.com/dexternguyen56/Stock-Price-Prediction
# Collaborators:
Tran Nguyen

Daeyoung Hwang

Dexxer Medina

Nishara Hysmith
