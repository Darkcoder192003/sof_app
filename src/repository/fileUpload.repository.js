import { AppUrl } from "../res/appUrl";
import { ApiService } from "../data/network/apiService";
export class FileUploadRepository {
    constructor() {
        this.appUrl = new AppUrl();
    this.apiService = new ApiService();
    }
    async uploadImage(payload) {
        const url = `${this.appUrl.fileUploadEndPoint}/`
        try {
        
            return await this.apiService.getPostApiResponse(url, payload, "formdata");
        } catch (error) {
            throw error
        }
    }
}