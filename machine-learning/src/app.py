from bottle import run
from handler.cors import *
from router.pairs import *
from router.importance import *
from router.outliers import *
from os import environ


run(host="0.0.0.0", port=environ.get("MACHINE_LEARNING_PORT"))
