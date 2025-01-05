from sklearn.ensemble import RandomForestRegressor
from models.regression.base_regressor import BaseRegressor

class RandomForestRegressorModel(BaseRegressor):
    def __init__(self, n_estimators=100, max_depth=None, random_state=0, **params):
        """
        Random Forest Regressor.
        """
        super().__init__(**params)
        self.model = RandomForestRegressor(
            n_estimators=n_estimators,
            max_depth=max_depth,
            random_state=random_state,
            **params
        )
        print("RandomForestRegressorModel is been used", flush=True)

    def get_feature_importances(self):
        """
        Return the feature importances of the fitted model.
        """
        # Ensure the model has been fitted
        if not hasattr(self.model, 'feature_importances_'):
            raise RuntimeError("Model is not fitted yet. Please fit the model first.")
        print("Loading GPT model1...", flush=True)
        return self.model.feature_importances_
