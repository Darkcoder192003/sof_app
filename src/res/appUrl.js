export class AppUrl {
  constructor() {
    this.baseUrl = true
      ? "https://sopncl.org/api/v1"
      : "http://192.168.1.7:9090/api/v1";
    this.authEndPoint = `${this.baseUrl}/auth`;
    this.fileUploadEndPoint = `${this.baseUrl}/upload`;
    this.jobEndPoint = `${this.baseUrl}/jobs`;
    this.userEndPoint = `${this.baseUrl}/users`;
    this.vehicleEndPoint = `${this.baseUrl}/vechile`;
  }
}
