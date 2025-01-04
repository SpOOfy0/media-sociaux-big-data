from models.classification.base_classifier import BaseClassifier
from sklearn.linear_model import LogisticRegression

class LogisticRegressionModel(BaseClassifier):
    def __init__(self, **params):
        super().__init__(**params)
        self.model = LogisticRegression(**params)
