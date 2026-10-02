import os
import joblib
import pandas as pd


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "logistic_regression.pkl"
)


SCALER_PATH = os.path.join(
    BASE_DIR,
    "models",
    "scaler.pkl"
)


FEATURE_COLUMNS = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal"
]


def predict_heart_disease(data):

    model = joblib.load(
        MODEL_PATH
    )

    scaler = joblib.load(
        SCALER_PATH
    )


    input_data = pd.DataFrame(
        [data],
        columns=FEATURE_COLUMNS
    )


    input_scaled = scaler.transform(
        input_data
    )


    prediction = model.predict(
        input_scaled
    )[0]


    probabilities = model.predict_proba(
        input_scaled
    )[0]


    probability = float(
        probabilities[1]
    )


    if probability < 0.30:

        risk = "Low"

    elif probability < 0.70:

        risk = "Moderate"

    else:

        risk = "High"


    return {

        "prediction": int(
            prediction
        ),

        "probability": round(
            probability * 100,
            2
        ),

        "risk": risk

    }