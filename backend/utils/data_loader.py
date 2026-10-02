import os
import pandas as pd


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(BASE_DIR, "dataset", "heart.csv")


def get_dataset():
    return pd.read_csv(DATASET_PATH)


def get_dataset_summary():

    df = get_dataset()

    return {
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "missing_values": int(df.isnull().sum().sum()),
        "disease_cases": int(df["target"].sum()),
        "no_disease_cases": int((df["target"] == 0).sum())
    }