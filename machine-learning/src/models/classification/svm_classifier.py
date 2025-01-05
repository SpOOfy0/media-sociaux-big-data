from models.classification.base_classifier import BaseClassifier
from sklearn.svm import SVC

class SVMClassifierModel(BaseClassifier):
    def __init__(self, **params):
        super().__init__(**params)
        self.model = SVC(**params)
