import pandas as pd

DATA_PATH = "backend/dataset/heart.csv"


def load_data():
    return pd.read_csv(DATA_PATH)


def dataset_statistics(df):
    print("\n========== DATASET STATISTICS ==========")

    print("\nShape:")
    print(df.shape)

    print("\nMean:")
    print(df.mean(numeric_only=True))

    print("\nMedian:")
    print(df.median(numeric_only=True))

    print("\nStandard Deviation:")
    print(df.std(numeric_only=True))

    print("\nMinimum:")
    print(df.min(numeric_only=True))

    print("\nMaximum:")
    print(df.max(numeric_only=True))


def target_statistics(df):
    print("\n========== TARGET STATISTICS ==========")

    print("\nTarget Count:")
    print(df["target"].value_counts())

    print("\nTarget Percentage:")
    print(df["target"].value_counts(normalize=True) * 100)


def feature_statistics(df):
    print("\n========== FEATURE STATISTICS ==========")

    selected_columns = [
        "age",
        "trestbps",
        "chol",
        "thalach",
        "oldpeak"
    ]

    print(df[selected_columns].describe())


if __name__ == "__main__":
    df = load_data()

    dataset_statistics(df)
    target_statistics(df)
    feature_statistics(df)