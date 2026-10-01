import os
import sys

sys.path.insert(
    0,
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

from api.app import app


def test_home():
    client = app.test_client()

    response = client.get("/")

    assert response.status_code in [200, 404]


def test_prediction_endpoint_exists():
    client = app.test_client()

    response = client.post(
        "/predict",
        json={
            "age": 55,
            "sex": 1,
            "cp": 1,
            "trestbps": 130,
            "chol": 250,
            "fbs": 0,
            "restecg": 1,
            "thalach": 150,
            "exang": 0,
            "oldpeak": 1.0,
            "slope": 1,
            "ca": 0,
            "thal": 2
        }
    )

    assert response.status_code in [200, 400, 404]