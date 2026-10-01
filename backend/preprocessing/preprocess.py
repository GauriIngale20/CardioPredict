import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


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

TARGET_COLUMN = "target"


def load_dataset():
    path = "backend/dataset/heart.csv"
    df = pd.read_csv(path)

    return df


def preprocess_data():
    df = load_dataset()

    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    scaler = StandardScaler()

    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    return (
        X_train_scaled,
        X_test_scaled,
        y_train,
        y_test,
        scaler
    )


if __name__ == "__main__":
    df = load_dataset()

    print("Dataset Shape:", df.shape)
    print("Features:", FEATURE_COLUMNS)
    print("Target:", TARGET_COLUMN)
    print("\nMissing Values:")
    print(df.isnull().sum())