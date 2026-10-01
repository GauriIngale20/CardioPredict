import os
import sys

sys.path.insert(
    0,
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

from utils.prediction import predict_heart_disease


def test_prediction():
    sample_data = {
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

    result = predict_heart_disease(sample_data)

    assert result is not None