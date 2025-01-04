from models.regression.base_regressor import BaseRegressor
from sklearn.linear_model import LinearRegression

class LinearRegressionModel(BaseRegressor):
    def __init__(self, **params):
        super().__init__(**params)
        self.model = LinearRegression(**params)
