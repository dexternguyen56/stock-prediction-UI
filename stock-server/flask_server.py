import stock_knn
from flask import Flask
from flask import jsonify
import flask
import json

app = Flask(__name__)

# Member API route


@app.route("/home", methods=['GET', 'POST'])
def index():
    if flask.request.method == 'OPTION':
        return
    if flask.request.method == 'GET':
        ticker = "AMZN"

        SPLIT_RATIO = 0.85

        prediction = stock_knn.Stock_Price(ticker, SPLIT_RATIO)
        data = prediction.high_low()

        return data

    if flask.request.method == 'POST':
        #message = 'Hello ' + flask.request.form['name-input'] + '!'
        res = flask.request.get_json()

       #res = json.load(res)

        res = res["ticker"]
        print(res)
        ticker = res if len(res) > 0 else "GME"
        SPLIT_RATIO = 0.85

        prediction = stock_knn.Stock_Price(ticker, SPLIT_RATIO)
        data = prediction.high_low()
        return data


@app.route("/")
def test():
    return jsonify({"Testing": "test"})


if __name__ == "__main__":
    app.run(debug=True)
