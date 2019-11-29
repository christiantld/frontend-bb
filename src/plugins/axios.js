/* eslint-disable */
import Vue from "vue";
import axios from "axios";

//axios.default.baseURL = "http://192.168.64.2/backend-bb/index.php";

//const cors = "https://cors-anywhere.herokuapp.com/";

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios.create({
      //Base URL da API
      baseURL: "http://localhost:8080/index.php"
      //baseURL: "https://jsonplaceholder.typicode.com/todos/1"
    });
  }
});
