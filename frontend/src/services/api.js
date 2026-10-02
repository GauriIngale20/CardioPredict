import axios from "axios";


const API = axios.create({

  baseURL: "https://cardiopredict-98ym.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },

});


export const getHealth = async () => {

  const response = await API.get("/health");

  return response.data;

};


export const getStatistics = async () => {

  const response = await API.get("/statistics");

  return response.data;

};


export const getDataset = async () => {

  const response = await API.get("/dataset");

  return response.data;

};


export const getModelPerformance = async () => {

  const response = await API.get("/model-performance");

  return response.data;

};


export const getFeatureImportance = async () => {

  const response = await API.get("/feature-importance");

  return response.data;

};


export const predictHeartDisease = async (patientData) => {

  const response = await API.post(
    "/predict",
    patientData
  );

  return response.data;

};


export default API;