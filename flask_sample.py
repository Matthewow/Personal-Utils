import sys
import os
import json
from flask import Flask, jsonify
from flask_cors import CORS
import uuid
from uuid import uuid4
import requests
from waitress import serve
import requests
import logging

logger = logging.getLogger("waitress")
logger.setLevel(logging.INFO)

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    logger.info("accessing...")
    return "<h1>TESTING"

@app.route("/query/", methods=["GET"])
def query():
    return "<h1>TESTING</h1>"

if __name__ == '__main__' :
    serve(app, host='0.0.0.0', port=5678)
