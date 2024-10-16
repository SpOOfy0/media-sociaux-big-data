from bottle import run
from handler.cors import *
from router.pairs import *
from router.importance import *
from router.outliers import *


run(host="0.0.0.0", port=13001)