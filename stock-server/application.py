
import stock_knn
import yfinance as yf
from flask import Flask
from flask import jsonify
import flask
import json
from flask_cors import CORS

application = Flask(__name__)

CORS(application)
# Member API route

SPLIT_RATIO = 0.85


@application.route("/home", methods=['GET', 'POST'])
def index():
    if flask.request.method == 'GET':
        ticker = "GOOGL"

        prediction = stock_knn.Stock_Price(ticker, SPLIT_RATIO)

        #data = {}
        data = prediction.high_low()
        # data["5"] = prediction.high_ema(5)
        # data["10"] = prediction.high_ema(10)

        # return json.dumps(data,indent=2)
        return data

    if flask.request.method == 'POST':
        #message = 'Hello ' + flask.request.form['name-input'] + '!'
        res = flask.request.get_json()

       #res = json.load(res)

        res = str(res["ticker"])
        # print(res)
        ticker = res if len(res) > 0 else "googl"
        print("POST:", ticker)
        prediction = stock_knn.Stock_Price(ticker, SPLIT_RATIO)

        # data = {}
        data = prediction.high_low()

        # data["5"] = prediction.high_ema(5)
        # data["10"] = prediction.high_ema(10)

       # return json.dumps(data,indent=2)
        return data


@application.route("/symbol", methods=['GET'])
def symbol():
    if flask.request.method == 'GET':
        res = flask.request.args.get('ticker')

       #res = json.load(res)
        res = str(res)
        # print(res)
        ticker = res if len(res) > 0 else "googl"
        print("POST:", ticker)
        prediction = stock_knn.Stock_Price(ticker, SPLIT_RATIO)

        # data = {}
        data = prediction.high_low()

        # data["5"] = prediction.high_ema(5)
        # data["10"] = prediction.high_ema(10)

       # return json.dumps(data,indent=2)
        return data


@application.route("/")
def test():
    return jsonify({"Testing": "test"})


@application.route("/title", methods=["GET"])
def title():
    if flask.request.method == 'POST':
        res = flask.request.get_json()
        ticker = str(res["ticker"])
        stock = yf.Ticker(ticker)
        return jsonify(stock.info["longName"])


if __name__ == "__main__":
    application.run(debug=True)
