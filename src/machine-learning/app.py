from bottle import run
from handler.cors import *
from router.pairs import *
from router.importance import *
from router.outliers import *


run(host="localhost", port=13001)