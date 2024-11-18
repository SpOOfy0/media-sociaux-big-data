from bottle import route, request, response
from transformers import pipeline
from json import dumps


print("Loading GPT model...", flush=True)
gpt = pipeline("text-generation", model="gpt2-large")
print("GPT model loaded", flush=True)


@route("/explaination", method=["OPTIONS", "POST"])
def get_explaination():
  if request.method == "OPTIONS":
    return {}

  response.content_type = "application/json"
  
  explainations = []
  for video in request.json:
    query = f"The comment \"{video['comment']}\" is {video['sentiment']} because"
    explaination = gpt(query, max_length=150, pad_token_id=gpt.tokenizer.eos_token_id)
    explainations.append(explaination)

  return dumps(explainations)