import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from datetime import datetime, timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
predictions = []



class Prediction():
    def __init__(self) -> None:
        self.df = pd.read_csv('ether_prices.csv')
        self.projection = 30
        self.df['prediction'] = self.df[['Close']].shift(-self.projection)
        self.X = np.array(self.df[['Close']])
        self.X = self.X[:-self.projection]
        self.y = self.df['prediction'].values
        self.y = self.y[:-self.projection]

    def predict(self):
        x_train, x_test, y_train, y_test = train_test_split(
            self.X, self.y, test_size=.15)
        self.lin = LinearRegression()
        self.lin.fit(x_train, y_train)
        lin_confidence = self.lin.score(x_test, y_test)
        return lin_confidence

    def day14predictions(self):
        x_projection = np.array(self.df[['Close']])[-self.projection:]
        lin_prediction = self.lin.predict(x_projection)
        lin_list = []
        for i in lin_prediction:
            lin_list.append(i)
        return lin_list


def add_upcoming_dates():
    dates_list = []
    current_date = datetime.now().date()

    for i in range(30):
        upcoming_date = current_date + timedelta(days=i)
        dates_list.append(upcoming_date.strftime("%Y-%m-%d"))

    return dates_list


app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/predict', methods=['GET'])
def home():
    if (request.method == 'GET'):
        return jsonify({'results': predictions})


if __name__ == '__main__':
    p = Prediction()
    p.predict()
    pred = p.day14predictions()
    pred.reverse()
    dates = add_upcoming_dates()
    for idx, i in enumerate(pred):
        predictions.append({'date': dates[idx], 'price': i})
    app.run(debug=True, host='0.0.0.0', port=8080)
