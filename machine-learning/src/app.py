from bottle import run ,route , default_app
from handler.cors import *
from router.pairs import *
from router.importance import *
from router.outliers import *
from router.sentiment import *
from router.explaination import *
from router.chat import *
from os import environ

app = default_app()
print("Routes disponibles dans l'application :")
for r in app.routes:
    print(f"Path: {r.rule}, Method: {', '.join(r.method)}")

run(host="0.0.0.0", port=environ.get("MACHINE_LEARNING_PORT"))
