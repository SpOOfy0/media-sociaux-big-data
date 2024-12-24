from bottle import hook, route, response


_allow_origin  = "*"
_allow_methods = "PUT, GET, POST, DELETE, OPTIONS"
_allow_headers = "Authorization, Origin, Accept, Content-Type, X-Requested-With"


@hook("after_request")
def enable_cors():
  """
  Enable CORS on API.
  """
  response.headers["Access-Control-Allow-Origin"] = _allow_origin
  response.headers["Access-Control-Allow-Methods"] = _allow_methods
  response.headers["Access-Control-Allow-Headers"] = _allow_headers