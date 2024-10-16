import pathlib
import json
from bottle import hook, request, response, abort, error


@hook("before_request")
def check_auth():
  """
  Check for auth token in request.
  """
  path = pathlib.Path(__file__).parent.parent.parent.parent.resolve()
  path = str(path)

  with open(path + "/.key", "r") as key_file:
    key = key_file.readline()

  if request.get_header("Authorization") != f"Bearer {key}":
    abort(404, "Not Found")


@error(404)
def not_found(error):
  response.content_type = "application/json"
  return json.dumps({"code": 404, "error": "Not Found"})