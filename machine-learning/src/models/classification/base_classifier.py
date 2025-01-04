from models.base_model import BaseModel

class BaseClassifier(BaseModel):
    def __init__(self, **params):
        super().__init__(**params)

    def get_classes(self):
        """
        Returns the classes the model can predict if available.
        """
        if hasattr(self.model, "classes_"):
            return self.model.classes_
        else:
            raise NotImplementedError(
                "This classifier does not support class extraction."
            )

    def get_feature_importances(self):
        """
        Returns feature importances for classifiers like decision trees.
        """
        if hasattr(self.model, "feature_importances_"):
            return self.model.feature_importances_
        else:
            raise NotImplementedError(
                "This classifier does not support feature importance extraction."
            )
