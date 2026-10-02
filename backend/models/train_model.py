import os
import joblib

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

from preprocessing.preprocess import preprocess_data, FEATURE_COLUMNS


MODEL_DIR = "models"


def train_models():

    os.makedirs(MODEL_DIR, exist_ok=True)

    (
        X_train,
        X_test,
        y_train,
        y_test,
        scaler
    ) = preprocess_data()

    logistic_model = LogisticRegression(
        max_iter=1000,
        random_state=42
    )

    random_forest_model = RandomForestClassifier(
        n_estimators=200,
        random_state=42
    )

    logistic_model.fit(X_train, y_train)

    random_forest_model.fit(X_train, y_train)

    joblib.dump(
        logistic_model,
        os.path.join(MODEL_DIR, "logistic_regression.pkl")
    )

    joblib.dump(
        random_forest_model,
        os.path.join(MODEL_DIR, "random_forest.pkl")
    )

    joblib.dump(
        scaler,
        os.path.join(MODEL_DIR, "scaler.pkl")
    )

    joblib.dump(
        FEATURE_COLUMNS,
        os.path.join(MODEL_DIR, "feature_columns.pkl")
    )

    print("Models trained successfully.")
    print("Saved files:")
    print("- logistic_regression.pkl")
    print("- random_forest.pkl")
    print("- scaler.pkl")
    print("- feature_columns.pkl")


if __name__ == "__main__":
    train_models()