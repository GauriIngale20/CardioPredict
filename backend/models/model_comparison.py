import os
import joblib

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)


try:
    from backend.preprocessing.preprocess import preprocess_data
except ModuleNotFoundError:
    from preprocessing.preprocess import preprocess_data


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


LOGISTIC_MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "logistic_regression.pkl"
)


RANDOM_FOREST_MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "random_forest.pkl"
)


def evaluate_model(model, X_test, y_test):

    predictions = model.predict(X_test)

    return {
        "accuracy": accuracy_score(
            y_test,
            predictions
        ),

        "precision": precision_score(
            y_test,
            predictions
        ),

        "recall": recall_score(
            y_test,
            predictions
        ),

        "f1_score": f1_score(
            y_test,
            predictions
        ),

        "confusion_matrix": confusion_matrix(
            y_test,
            predictions
        ).tolist()
    }


def compare_models():

    (
        X_train,
        X_test,
        y_train,
        y_test,
        scaler
    ) = preprocess_data()


    logistic_model = joblib.load(
        LOGISTIC_MODEL_PATH
    )


    random_forest_model = joblib.load(
        RANDOM_FOREST_MODEL_PATH
    )


    logistic_results = evaluate_model(
        logistic_model,
        X_test,
        y_test
    )


    random_forest_results = evaluate_model(
        random_forest_model,
        X_test,
        y_test
    )


    return {
        "Logistic Regression": logistic_results,

        "Random Forest": random_forest_results
    }


if __name__ == "__main__":

    results = compare_models()

    print(results)