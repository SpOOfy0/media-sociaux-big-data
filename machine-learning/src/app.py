from bottle import run
from handler.checkauth import *
from handler.cors import *
from router.pairs import *
from router.importance import *
from router.outliers import *


run(host="localhost", port=13001)