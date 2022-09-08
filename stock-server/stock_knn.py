# -*- coding: utf-8 -*-
# pip install ta yfinance

# -------------------------------------------------------------------------
# FILENAME: knn_stock.py
# SPECIFICATION: Stock price prediction with KNN regression
# -----------------------------------------------------------*/

from datetime import date
from datetime import timedelta
import ta
import pandas as pd
import numpy as np
import yfinance as yf
import math
from sklearn import neighbors
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import r2_score

pd.options.mode.chained_assignment = None  # default='warn'


class Stock_Price:
    def __init__(self, ticker, ratio):
        self.valid_ticker = False
        
        self.df = self.get_stock_price_data(ticker)

        self.ratio = ratio

        split = int(len(self.df.index) * ratio)

        self.train_data = self.df[:split]
        self.test_data = self.df[split:]

        self.model = GridSearchCV(neighbors.KNeighborsRegressor(),
                                  param_grid={'n_neighbors': np.arange(1, 25, 1), 'weights': [
                                      'distance', 'uniform']},
                                  cv=5,  refit=True, scoring='neg_mean_absolute_error')

    def previous_price(self):
        return self.df.iloc[-1:]  # [row:col]

    def high_low(self):
        # only keep high and low
        # TRAIN DATA
        X_train = self.train_data.drop(
            ['Open', 'Close', 'Volume', 'Adj Close'], axis=1)
        Y_train = self.train_data['Adj Close']

        X_train.drop(X_train.tail(1).index, inplace=True)  # Drop the last row
        # Drop  the first row
        Y_train.drop(Y_train.head(1).index, inplace=True)

        # TEST DATA
        x_test = self.test_data.drop(
            ['Open', 'Close', 'Volume', 'Adj Close'], axis=1)
        y_test = self.test_data['Adj Close']

        x_test .drop(x_test.tail(1).index, inplace=True)  # Drop the last row
        y_test.drop(y_test.head(1).index, inplace=True)  # Drop  the first row

        self.model.fit(X_train, Y_train)

        predict = self.model.predict(x_test)

        predicted = [round(price, 2) for price in predict.tolist()]

        result = pd.DataFrame(
            {'Predicted': predicted,  'Actual': y_test.round(2)})

        # print(result)

        return result.to_json(orient="index", date_format="iso")

    def high_ema(self, ema):
        # -----------------High and EMA------------------------
        # Match the (High) and (EMA) of today to the (Adj Close) price of tommorow

        # new_data with only adj close
        new_data = self.df[['High', 'Adj Close']]
        new_data['EMA'] = ta.trend.ema_indicator(
            new_data['Adj Close'], window=ema)  # Add EMA

        new_data.dropna(how='any', inplace=True)  # drop all rows with NaN

        split = int(len(new_data.index) * self.ratio)
        # We will delete exactly ema-1 rows at the begining

        # print(self.train_data)
        # print(new_data)

        # print(new_data)

        # Train Data
        X_train = new_data[:split][['High', 'EMA']]
        Y_train = new_data[:split]['Adj Close']

        X_train.drop(X_train.tail(1).index, inplace=True)  # Drop the last row
        # Drop  the first row
        Y_train.drop(Y_train.head(1).index, inplace=True)

        # Test Data
        x_test = new_data[split:][['High', 'EMA']]
        y_test = new_data[split:]['Adj Close']

        x_test.drop(x_test.tail(1).index, inplace=True)  # Drop the last row
        y_test.drop(y_test.head(1).index, inplace=True)  # Drop  the first row

        # print(X_train)
        # print(x_test)
        # print(Y_train)
        # print(y_test)
        self.model.fit(X_train, Y_train)

        predict = self.model.predict(x_test)

        predicted = [round(price, 2) for price in predict.tolist()]

        result = pd.DataFrame(
            {'High-EMA-'+str(ema): predicted,  'Adj Close': y_test.round(2)})

        return result.to_json(orient="index", date_format="iso")

    def get_stock_price_data(self, ticker):
        end_date = date.today()

        start_date = end_date - timedelta(365 * 3)
        df = yf.download(ticker, start_date, end_date)

        return df

    def performance(self, predicted, adj_price):
        print("MAE:  ", mean_absolute_error(predicted, adj_price))
        print("RMSE: ", math.sqrt(mean_squared_error(predicted, adj_price)))
        print("R2:   ", r2_score(predicted, adj_price))

    
    # ticker = input("Enter the stock ticker: ")

    # high_low = prediction.high_low()
    # high_ema = prediction.high_ema(5)

    # print(high_ema)

    # performance(high_low.iloc[:, 0], high_low.iloc[:, 1])
    # performance(high_ema.iloc[:, 0], high_ema.iloc[:, 1]
