import joblib

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)

from backend.preprocessing.preprocess import preprocess_data


def evaluate_model(model, X_test, y_test):

    predictions = model.predict(X_test)

    return {
        "accuracy": accuracy_score(y_test, predictions),
        "precision": precision_score(y_test, predictions),
        "recall": recall_score(y_test, predictions),
        "f1_score": f1_score(y_test, predictions),
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
        "backend/models/logistic_regression.pkl"
    )

    random_forest_model = joblib.load(
        "backend/models/random_forest.pkl"
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

    print("\nLogistic Regression")
    print(logistic_results)

    print("\nRandom Forest")
    print(random_forest_results)

    return {
        "Logistic Regression": logistic_results,
        "Random Forest": random_forest_results
    }


if __name__ == "__main__":
    compare_models()