import { AppExcaptions } from "../appExcaptions";
import AsyncStorage from '@react-native-async-storage/async-storage';
export class ApiService {
  async getGetApiResponse(url) {
    const requestBody = await this.createRequestBody("GET", {});
    try {
      const response = await fetch(url, requestBody);
      this.jsonResponse = this.returnResponse(response);
    } catch (error) {
      throw error;
    }
    return this.jsonResponse;
  }
  async getPostApiResponse(url, body, data = "json") {
    const requestBody = await this.createRequestBody("POST", body, data);
    try {
      const response = await fetch(url, requestBody);
      this.jsonResponse = this.returnResponse(response);
    } catch (error) {
      throw error;
    }
    return this.jsonResponse;
  }
  async getPutApiResponse(url, body) {
    const requestBody = await this.createRequestBody("PUT", body);
    try {
      const response = await fetch(url,requestBody );
      this.jsonResponse = this.returnResponse(response);
    } catch (error) {
      throw error;
    }
    return this.jsonResponse;
  }
  async getPatchApiResponse(url, body) {
    const requestBody = await this.createRequestBody("PATCH", body);
    try {
      const response = await fetch(url, requestBody);
      this.jsonResponse = this.returnResponse(response);
    } catch (error) {
      throw error;
    }
    return this.jsonResponse;
  }
  async getDeleteApiResponse(url, body) {
    const requestBody = await this.createRequestBody("DELETE", body);
    try {
      const response = await fetch(url, requestBody);
      this.jsonResponse = this.returnResponse(response);
    } catch (error) {
      throw error;
    }
   return this.jsonResponse;
  }
 async createRequestBody(method, body, data = "json") {
    const token = await AsyncStorage.getItem("userToken");
    if (method === "GET") {
      return {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    }
    if (data === "formdata") {
      return {
        method: method,
        body: body,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    }
    return {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
  }
  async returnResponse(response) {
    const body = await response.json();
    switch (response.status) {
      case 200:
        return body;
      case 201:
        return body;
      case 400:
        throw new AppExcaptions(
          body.message,
          "UnAuthorised"
        );
      case 404:
        throw new AppExcaptions(body.message, "Bad Request");
      default:
        throw new AppExcaptions(body.message, "Server Error");
    }
  }
}
