from bottle import route, request, response
from pandas import DataFrame
from handler.figtoimg import fig2img
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from matplotlib.pyplot import close, figure
from numpy import arange


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

  regressor = RandomForestRegressor(n_estimators=100, random_state=0)
  regressor.fit(X_tr, y_tr)

  importance = regressor.feature_importances_
  ys = arange(len(importance))
  plot = figure()
  ax = plot.add_subplot()
  ax.barh(ys, importance)
  ax.set_yticks(ys, labels=list(X))

  image = fig2img(plot)
  close(plot)

  return image