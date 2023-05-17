import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-type": "application/json",
  },
});

class CodeChampServices {
  async registerUser(data) {
    try {
      return await http.post("register/", data);
    } catch (error) {
      return { error: error, status: "failed" };
    }
  }
  async postLogin(data) {
    try {
      return await http.post("login/", data);
    } catch (error) {}
  }

  async postProblem(data) {
    try {
      return await http.post("problem/", data);
    } catch (error) {
      console.log("error in postProblem: ", error);
    }
  }

  async getProblemsList() {
    try {
      return await http.get("problem/");
    } catch (error) {
      console.log("Error in getProblemsList: ", error);
    }
  }
  async getProblem(qid) {
    try {
      return await http.get(`problem/${qid}`, qid);
    } catch (error) {
      console.log("Error in getProblem: ", error);
    }
  }

  async postSubmission(data, qid) {
    try {
      return await http.post(`problem/${qid}/submit/`, data);
    } catch (error) {
      console.log("Error in postSubmission: ", error);
    }
  }

  async getSubmissions(qid, user) {
    try {
      return await http.get("submissions/", {
        params: {
          qid: qid,
          user: user,
        },
      });
    } catch (error) {
      console.log("Error in getSubmissions: ", error);
    }
  }
}

export default new CodeChampServices();
