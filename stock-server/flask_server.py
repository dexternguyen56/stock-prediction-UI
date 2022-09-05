import stock_knn
from flask import Flask
from flask import jsonify
import flask

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

        return {"Testing": "aaaaaaaaaaaaaaaaaaaaaa"}


@app.route("/")
def test():
    return jsonify({"Testing": "test"})


if __name__ == "__main__":
    app.run(debug=True)
