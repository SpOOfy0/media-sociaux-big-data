from bottle import route, request, response
from pandas import DataFrame
from seaborn import boxplot
from handler.figtoimg import fig2img
from matplotlib.pyplot import close


def __get_image(data: dict) -> bytes:
  """
  Gets the image from the request data.
  """
  dataframe = DataFrame(data)
  plot = boxplot(data=dataframe, x="views")
  image = fig2img(plot.figure)
  close(plot.figure)
  return image 


@route("/outliers", method=["OPTIONS", "POST"])
def detect_outliers():
  """
  Returns the box plot of all outliers for views.
  """
  if request.method == "OPTIONS":
    return {}

  response.content_type = "image/png"
  return __get_image(request.json)