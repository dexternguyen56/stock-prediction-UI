
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
from datetime import date,datetime



application = Flask(__name__)

CORS(application)

# Member API route

SPLIT_RATIO = 0.85

#DB
cluster = MongoClient("mongodb+srv://stockpriceprediction:stockpriceprediction@stock.nicsij0.mongodb.net/?retryWrites=true&w=majority")
db = cluster["stock-data"]
collection = db["symbol"]


def build_model(ticker,ema):
    
    prediction = stock_knn.Stock_Price(ticker, SPLIT_RATIO)
    data = prediction.high_low()

    data_ema = prediction.high_ema(ema)
    
    data['EMA'] = data_ema['EMA']
    
    # scoring_low = prediction.performance(data['Predicted'],data['Actual'])
    # scoring_ema = prediction.performance(data['EMA'],data['Actual'])
    
    # metrics = {"low": scoring_low, "ema":scoring_ema}
    # print(metrics)
    
    save_data = data.to_json(orient="index", date_format="iso")
    return save_data
    

def get_data(ticker,ema):
    
    today = date.today()
    today = str(today) + "T00:00:00.000Z"
    
    if collection.count_documents({ '_id': ticker }):
        print("Found ",ticker)
        if collection.count_documents({ 'input_date': today }):
            print("Found the same day")
        else:
            print("Update ",ticker)
            
            save_data = build_model(ticker,ema)
            collection.update_one({"_id" :ticker},{"$set":{'input_date': today,  "data" :save_data}})
    else:   
        print("Insert ",ticker)
        
        save_data = build_model(ticker,ema)
        
        info = get_yahoo_shortname(ticker)
        
        collection.insert_one({"_id" :ticker,'input_date': today, "stock_info":info,  "data" :save_data})
        
    
    result = collection.find_one({"_id":ticker}, {"stock_info":1, "data":1})

    return result
        
        
        

    # prediction = stock_knn.Stock_Price(ticker, SPLIT_RATIO)


    # data = prediction.high_low()

    # data_ema = prediction.high_ema(ema)
    
    # data['EMA'] = data_ema['EMA']
    
    # scoring = prediction.performance(data['Predicted'],data['Actual'])
    # print(scoring)
    
    # save_data = data.to_json(orient="index", date_format="iso")
    return 1
   
        


@application.route("/home", methods=['GET', 'POST'])
def index():
    if flask.request.method == 'GET':
        
        ema = 5
        data = get_data("GOOGL",ema)

        return data["data"]
 


@application.route("/symbol", methods=['POST'])
def symbol():
    if flask.request.method == 'POST':

        res = flask.request.get_json()
        ticker = res['params']['ticker']
        ema = 5

        ticker = str(ticker) if ticker else "googl"
        ticker = ticker.upper()
        
            

        try:
            valid_ticker = get_yahoo_shortname(ticker)
            
            data = get_data(ticker,ema)
               
        except:
            data = get_data("GOOGL",ema)
            

        return data["data"]
 
# 
@application.route("/")
def test():
    return jsonify({"Testing": "test"})


@application.route("/title", methods=["GET"])
def title():
    if flask.request.method == 'GET':
        ticker = flask.request.args.get('ticker')
        ticker = str(ticker)
        
        title = ticker.upper()
        try:
            if collection.count_documents({ '_id': ticker }):
                result = collection.find_one({"_id":ticker}, {"stock_info":1})
            else:
                result = collection.find_one({"_id":"GOOGL"}, {"stock_info":1})
                
            title = result["stock_info"] 
        except:
            title = "GOOGL"
            
        data = {"title": title}

        return data


def get_yahoo_shortname(symbol):
    response = urllib.request.urlopen(f'https://query2.finance.yahoo.com/v1/finance/search?q={symbol}')
    content = response.read()
    data = json.loads(content.decode('utf8'))['quotes'][0]['shortname']
    return data


if __name__ == "__main__":
    application.run()
