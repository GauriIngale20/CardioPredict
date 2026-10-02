import pandas as pd


DATA_PATH = "dataset/heart.csv"


def load_data():
    return pd.read_csv(DATA_PATH)


def get_age_distribution(df):
    return df["age"].value_counts().sort_index().to_dict()


def get_blood_pressure_distribution(df):
    return df["trestbps"].value_counts().sort_index().to_dict()


def get_cholesterol_distribution(df):
    return df["chol"].value_counts().sort_index().to_dict()


def get_heart_disease_distribution(df):
    return df["target"].value_counts().sort_index().to_dict()


def get_risk_distribution(df):
    return df["target"].value_counts().sort_index().to_dict()


def get_gender_distribution(df):
    return df["sex"].value_counts().sort_index().to_dict()


def get_chest_pain_distribution(df):
    return df["cp"].value_counts().sort_index().to_dict()


def get_visualization_data():
    df = load_data()

    return {
        "age_distribution": get_age_distribution(df),
        "blood_pressure_distribution": get_blood_pressure_distribution(df),
        "cholesterol_distribution": get_cholesterol_distribution(df),
        "heart_disease_distribution": get_heart_disease_distribution(df),
        "risk_distribution": get_risk_distribution(df),
        "gender_distribution": get_gender_distribution(df),
        "chest_pain_distribution": get_chest_pain_distribution(df)
    }


if __name__ == "__main__":
    data = get_visualization_data()

    for name, values in data.items():
        print(f"\n{name}:")
        print(values)