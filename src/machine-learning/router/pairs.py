from bottle import route, request, response
from pandas import DataFrame
from seaborn import pairplot
from handler.figtoimg import fig2img
from matplotlib.pyplot import close


def __get_image(data: dict) -> bytes:
  """
  Gets the image from the request data.
  """
  dataframe = DataFrame(data)
  plot = pairplot(dataframe)
  image = fig2img(plot.figure)
  close(plot.figure)
  return image 


@route("/pairs", method=["OPTIONS", "POST"])
def create_pairs():
  """
  Returns the pair plot from given data.
  """
  if request.method == "OPTIONS":
    return {}

  response.content_type = "image/png"
  return __get_image(request.json)