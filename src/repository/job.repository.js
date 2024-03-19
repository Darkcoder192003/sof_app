import {AppUrl} from '../res/appUrl';
import {ApiService} from '../data/network/apiService';
export class JobRepository {
  constructor() {
    this.appUrl = new AppUrl();
    this.apiService = new ApiService();
  }
  async getJobs() {
    const url = `${this.appUrl.jobEndPoint}/`;
    try {
      return this.apiService.getGetApiResponse(url);
    } catch (error) {
      throw error;
    }
  }
}
  