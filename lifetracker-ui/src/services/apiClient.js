import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "life_tracker_token";
  }
  getTokenName(){
    return this.tokenName
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    
    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    

    try {
      console.log('AXIOS CALL',{ url, method, data, headers });

      // console.log('DATA: ',data);


      const res = await axios({ url, method, data, headers });

      console.log('AXIOS RES',res.data);

      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      console.log(message,error);

      return { data: null, error: message || String(error) };
    }
  }
  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` });
  }
  async signUpUser(credentials){
    const res = await this.request({
      endpoint: "auth/register/",
      method: "POST",
      data: credentials,
    });
    return res
  }
  async loginUser(credentials){
    
    
    const res = await this.request({
      endpoint: "auth/login/",
      method: "POST",
      data: credentials,
    });

    return res
  }

}

export default new ApiClient(
  process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"
);
