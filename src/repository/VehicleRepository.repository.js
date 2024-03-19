import { AppUrl } from "../res/appUrl";
import { ApiService } from "../data/network/apiService";
export class VehicleRepository {
  constructor() {
    this.appUrl = new AppUrl();
    this.apiService = new ApiService();
  }
  async submit(payload) {
    const url = `${this.appUrl.vehicleEndPoint}/`;
    try {
      return this.apiService.getPostApiResponse(url, payload);
    } catch (error) {
      throw error;
    }
  }
  async comment(payload) {
    const url = `${this.appUrl.vehicleEndPoint}/comment`;
    try {
      return this.apiService.getPostApiResponse(url, payload);
    } catch (error) {
      throw error;
    }
  }
}
