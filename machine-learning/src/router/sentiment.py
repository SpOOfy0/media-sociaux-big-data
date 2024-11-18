from bottle import route, request, response
from transformers import pipeline
from json import dumps


print("Loading SA model...", flush=True)
analysis = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased-finetuned-sst-2-english")
print("SA model loaded...", flush=True)


@route("/sentiment", method=["OPTIONS", "POST"])
def get_sentiment():
  if request.method == "OPTIONS":
    return {}

  response.content_type = "application/json"
  
  comments = []
  for video in request.json:
    comments.append(video["comment"])
  
  sentiments = analysis(comments)

  return dumps(sentiments)