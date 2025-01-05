from sklearn.datasets import load_diabetes, load_iris
from sklearn.model_selection import train_test_split
from models.regression.linear_regression import LinearRegressionModel
from models.classification.logistic_regression import LogisticRegressionModel
from models.regression.random_forest_regressor import RandomForestRegressorModel

# Test of Linear Regression
def test_linear_regression():
    data = load_diabetes()
    X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2, random_state=42)
    model = LinearRegressionModel()
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    score = model.evaluate(X_test, y_test)
    print("Linear Regression Test")
    print("Score:", score)
    print("Coefficients:", model.get_coefficients())
    print("Intercept:", model.get_intercept())

# Test of Logistic Regression
def test_logistic_regression():
    data = load_iris()
    X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2, random_state=42)
    model = LogisticRegressionModel(max_iter=200)
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    score = model.evaluate(X_test, y_test)
    print("\nLogistic Regression Test")
    print("Score:", score)
    print("Classes:", model.get_classes())

# Test of Random Forest Regressor
def test_random_forest_regressor():
    data = load_diabetes()
    X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2, random_state=42)
    model = RandomForestRegressorModel(n_estimators=50)
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    score = model.evaluate(X_test, y_test)
    print("\nRandom Forest Regressor Test")
    print("Score:", score)

if __name__ == "__main__":
    test_linear_regression()
    test_logistic_regression()
    test_random_forest_regressor()
