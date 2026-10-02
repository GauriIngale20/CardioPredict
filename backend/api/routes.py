from flask import Blueprint, request, jsonify
import pandas as pd
import joblib
import os


try:
    from backend.utils.data_loader import get_dataset_summary
    from backend.utils.prediction import predict_heart_disease
    from backend.models.model_comparison import compare_models
except ModuleNotFoundError:
    from utils.data_loader import get_dataset_summary
    from utils.prediction import predict_heart_disease
    from models.model_comparison import compare_models


api = Blueprint("api", __name__)


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


DATASET_PATH = os.path.join(
    BASE_DIR,
    "dataset",
    "heart.csv"
)


MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "random_forest.pkl"
)


FEATURE_COLUMNS_PATH = os.path.join(
    BASE_DIR,
    "models",
    "feature_columns.pkl"
)


@api.route("/health", methods=["GET"])
def health():

    return jsonify({
        "status": "success",
        "message": "Heart Disease Prediction API is running"
    })


@api.route("/statistics", methods=["GET"])
def statistics():

    try:

        summary = get_dataset_summary()

        return jsonify(summary)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


@api.route("/dataset", methods=["GET"])
def dataset():

    try:

        df = pd.read_csv(DATASET_PATH)

        return jsonify({
            "data": df.to_dict(
                orient="records"
            )
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


@api.route("/model-performance", methods=["GET"])
def model_performance():

    try:

        results = compare_models()

        formatted_results = {}

        for model_name, metrics in results.items():

            formatted_results[model_name] = {

                "accuracy": round(
                    metrics["accuracy"] * 100,
                    2
                ),

                "precision": round(
                    metrics["precision"] * 100,
                    2
                ),

                "recall": round(
                    metrics["recall"] * 100,
                    2
                ),

                "f1_score": round(
                    metrics["f1_score"] * 100,
                    2
                )
            }

        return jsonify(formatted_results)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


@api.route("/feature-importance", methods=["GET"])
def feature_importance():

    try:

        model = joblib.load(
            MODEL_PATH
        )

        feature_columns = joblib.load(
            FEATURE_COLUMNS_PATH
        )

        importances = model.feature_importances_

        result = []

        for feature, importance in zip(
            feature_columns,
            importances
        ):

            result.append({

                "feature": feature,

                "importance": round(
                    float(importance) * 100,
                    2
                )
            })

        result.sort(
            key=lambda x: x["importance"],
            reverse=True
        )

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


@api.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        required_features = [

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

        missing = [

            feature
            for feature in required_features
            if feature not in data
        ]

        if missing:

            return jsonify({

                "error": "Missing features",

                "missing": missing

            }), 400

        result = predict_heart_disease(data)

        return jsonify(result)

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500