from flask import Flask
from flask_cors import CORS

from backend.api.routes import api


app = Flask(__name__)

CORS(app)

app.register_blueprint(
    api,
    url_prefix="/api"
)


@app.route("/")
def home():

    return {
        "message": "Heart Disease Prediction Backend",
        "status": "running"
    }


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )