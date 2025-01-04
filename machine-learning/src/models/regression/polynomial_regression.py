from models.regression.base_regressor import BaseRegressor
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline

class PolynomialRegressionModel(BaseRegressor):
    def __init__(self, degree=2, **params):
        super().__init__(**params)
        self.model = Pipeline([
            ("polynomial_features", PolynomialFeatures(degree=degree)),
            ("linear_regression", LinearRegression(**params))
        ])
