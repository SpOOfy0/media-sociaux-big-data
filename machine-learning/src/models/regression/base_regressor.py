from models.base_model import BaseModel

class BaseRegressor(BaseModel):
    def __init__(self, **params):
        super().__init__(**params)

    def get_coefficients(self):
        """
        Returns coefficients of the regression model if available.
        """
        if hasattr(self.model, "coef_"):
            return self.model.coef_
        else:
            raise NotImplementedError(
                "This regression model does not support coefficient extraction."
            )

    def get_intercept(self):
        """
        Returns the intercept of the regression model if available.
        """
        if hasattr(self.model, "intercept_"):
            return self.model.intercept_
        else:
            raise NotImplementedError(
                "This regression model does not support intercept extraction."
            )
        

