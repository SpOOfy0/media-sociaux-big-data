from models.classification.base_classifier import BaseClassifier
from sklearn.tree import DecisionTreeClassifier

class DecisionTreeClassifierModel(BaseClassifier):
    def __init__(self, **params):
        super().__init__(**params)
        self.model = DecisionTreeClassifier(**params)
