from sklearn.linear_model import Ridge
from models.regression.base_regressor import BaseRegressor 

class RidgeRegressionModel(BaseRegressor):
    def __init__(self, **params):
        super().__init__(**params)
        self.model = Ridge(**params)
