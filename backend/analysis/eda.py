import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


DATA_PATH = "dataset/heart.csv"


def load_data():
    return pd.read_csv(DATA_PATH)


def basic_information(df):
    print("\nDataset Shape:")
    print(df.shape)

    print("\nColumns:")
    print(df.columns.tolist())

    print("\nData Types:")
    print(df.dtypes)

    print("\nMissing Values:")
    print(df.isnull().sum())

    print("\nDuplicate Rows:")
    print(df.duplicated().sum())


def statistical_summary(df):
    print("\nStatistical Summary:")
    print(df.describe())


def target_distribution(df):
    print("\nTarget Distribution:")
    print(df["target"].value_counts())

    plt.figure(figsize=(6, 4))
    sns.countplot(data=df, x="target")
    plt.title("Heart Disease Distribution")
    plt.xlabel("Heart Disease")
    plt.ylabel("Count")
    plt.show()


def correlation_analysis(df):
    plt.figure(figsize=(12, 8))
    correlation = df.corr(numeric_only=True)

    sns.heatmap(
        correlation,
        annot=True,
        cmap="coolwarm",
        fmt=".2f"
    )

    plt.title("Feature Correlation Heatmap")
    plt.tight_layout()
    plt.show()


def age_distribution(df):
    plt.figure(figsize=(8, 5))
    sns.histplot(
        data=df,
        x="age",
        bins=20,
        kde=True
    )

    plt.title("Age Distribution")
    plt.xlabel("Age")
    plt.ylabel("Count")
    plt.tight_layout()
    plt.show()


def cholesterol_distribution(df):
    plt.figure(figsize=(8, 5))
    sns.histplot(
        data=df,
        x="chol",
        bins=20,
        kde=True
    )

    plt.title("Cholesterol Distribution")
    plt.xlabel("Cholesterol")
    plt.ylabel("Count")
    plt.tight_layout()
    plt.show()


def blood_pressure_distribution(df):
    plt.figure(figsize=(8, 5))
    sns.histplot(
        data=df,
        x="trestbps",
        bins=20,
        kde=True
    )

    plt.title("Resting Blood Pressure Distribution")
    plt.xlabel("Resting Blood Pressure")
    plt.ylabel("Count")
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    df = load_data()

    basic_information(df)
    statistical_summary(df)
    target_distribution(df)
    correlation_analysis(df)
    age_distribution(df)
    cholesterol_distribution(df)
    blood_pressure_distribution(df)