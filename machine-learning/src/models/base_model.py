class BaseModel:
    def __init__(self, **params):
        """
        Initializes the base model with the given parameters.
        """
        self.params = params
        self.model = None

    def fit(self, X, y):
        """
        Fits the model on the provided data.
        """
        print("Fitting model...")
        self.model.fit(X, y)

    def predict(self, X):
        """
        Predicts outcomes for the given input data.
        """
        return self.model.predict(X)

    def evaluate(self, X, y):
        """
        Evaluates the model on the given data.
        """
        if hasattr(self.model, "score"):
            return self.model.score(X, y)
        else:
            raise NotImplementedError("Evaluation not supported for this model.")

    def get_params(self):
        """
        Returns the parameters of the model.
        """
        
        return self.params
