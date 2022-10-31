
import stock_knn
import yfinance as yf
from flask import Flask
from flask import jsonify
import flask
import json
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd
import urllib



application = Flask(__name__)

CORS(application)

# Member API route

SPLIT_RATIO = 0.85


@application.route("/home", methods=['GET', 'POST'])
def index():
    if flask.request.method == 'GET':
        ticker = "GOOGL"
        ema = 5

        prediction = stock_knn.Stock_Price(ticker, SPLIT_RATIO)

        data = prediction.high_low()

        data_ema = prediction.high_ema(ema)
        
        data['EMA'] = data_ema['EMA']
        
  

        return data.to_json(orient="index", date_format="iso")



@application.route("/symbol", methods=['POST'])
def symbol():
    if flask.request.method == 'POST':

        res = flask.request.get_json()
        ticker = res['params']['ticker']
        ema = 5

        ticker = str(ticker) if ticker else "googl"
        print("POST:", ticker)
        prediction = stock_knn.Stock_Price(ticker, SPLIT_RATIO)


        data = prediction.high_low()

        data_ema = prediction.high_ema(ema)
       
        data['EMA'] = data_ema['EMA']
        
        scoring = prediction.performance(data['Predicted'],data['Actual'])
        print(scoring)

       
        return data.to_json(orient="index", date_format="iso")
 
# 
@application.route("/")
def test():
    return jsonify({"Testing": "test"})


@application.route("/title", methods=["GET"])
def title():
    if flask.request.method == 'GET':
        ticker = flask.request.args.get('ticker')
        ticker = str(ticker)
        try:

            
            title = get_yahoo_shortname(ticker)
        except:
            title = ticker.upper()
            
        data = {"title": title}

        return data


def get_yahoo_shortname(symbol):
    response = urllib.request.urlopen(f'https://query2.finance.yahoo.com/v1/finance/search?q={symbol}')
    content = response.read()
    data = json.loads(content.decode('utf8'))['quotes'][0]['shortname']
    return data


if __name__ == "__main__":
    application.run()
