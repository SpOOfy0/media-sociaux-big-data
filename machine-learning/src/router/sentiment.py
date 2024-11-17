from bottle import route, request, response
from transformers import pipeline


@route("/sentiment", method=["OPTIONS", "POST"])
def get_sentiment():
  """
  Returns the pair plot from given data.
  """
  if request.method == "OPTIONS":
    return {}

  response.content_type = "application/json"
  
  comments = []
  for video in request.json:
    comments.append(video["comment"])

  return pipeline("sentiment-analysis")(comments)