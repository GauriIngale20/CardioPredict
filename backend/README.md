# Heart Disease Prediction - Backend

This backend provides the machine learning functionality and REST API for the Heart Disease Prediction Dashboard.

## Features

- Heart disease dataset processing
- Data preprocessing
- Exploratory Data Analysis
- Statistical analysis
- Machine learning prediction
- Logistic Regression model
- Random Forest model
- Model comparison
- REST API using Flask
- Prediction testing using Pytest

## Dataset

The project uses a heart disease dataset containing 1025 records and 14 columns.

Target column:

- `target`

## Machine Learning Models

The backend includes:

- Logistic Regression
- Random Forest

## Project Structure

```text
backend/
├── analysis/
│   ├── eda.py
│   ├── statistics.py
│   └── visualization_data.py
│
├── api/
│   ├── app.py
│   └── routes.py
│
├── dataset/
│   └── heart.csv
│
├── models/
│   ├── feature_columns.pkl
│   ├── logistic_regression.pkl
│   ├── random_forest.pkl
│   ├── scaler.pkl
│   ├── model_comparison.py
│   └── train_model.py
│
├── preprocessing/
│   └── preprocess.py
│
├── tests/
│   ├── test_api.py
│   └── test_prediction.py
│
├── utils/
│   ├── data_loader.py
│   └── prediction.py
│
└── requirements.txt