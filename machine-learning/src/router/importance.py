from bottle import route, request, response
from pandas import DataFrame
from handler.figtoimg import fig2img
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from matplotlib.pyplot import close, figure
from numpy import arange
from models.regression.random_forest_regressor import RandomForestRegressorModel


def __get_data(data: dict, y_label: str) -> bytes:
    """
    Gets the image from the request data.
    """
    df = DataFrame(data)
    X = df.drop(columns=[y_label])
    y = df[y_label]

    return X, y


@route("/importance", method=["OPTIONS", "POST"])
def get_importance():
    """
    Returns the importance histogram for given features.
    """
    if request.method == "OPTIONS":
        return {}

    response.content_type = "image/png"

    X, y = __get_data(request.json["data"], request.json["y"])
    X_tr, X_ts, y_tr, y_ts = train_test_split(X, y, test_size=0.2, random_state=0)

    regressor = RandomForestRegressorModel(n_estimators=100, random_state=0)  # You can change the model here
    regressor.fit(X_tr, y_tr)

    importance = regressor.get_feature_importances()
    xs = arange(len(importance)) 
    plot = figure(figsize=(8, 6))  
    ax = plot.add_subplot()
    
    # Plot vertical bars with red color
    ax.bar(xs, importance, color='red', edgecolor='black')
    
    # Add labels and title
    ax.set_xticks(xs)
    ax.set_xticklabels(list(X), rotation=45, ha='right', fontsize=10)  
    ax.set_title("Feature Importance", fontsize=14)
    ax.set_xlabel("Features", fontsize=12)
    ax.set_ylabel("Importance Scoreee", fontsize=12)
    ax.grid(axis='y', linestyle='--', alpha=0.7)  

    image = fig2img(plot)
    close(plot)

    return image
