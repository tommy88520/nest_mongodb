import { createStore } from "vuex";
import axios from "axios";
const userRequest = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});
export default createStore({
  state: {
    hotelData: [],
  },
  mutations: {
    getHotelDate(state, payload) {
      state.hotelData = payload;
    },
  },
  actions: {
    async getHotel({ commit }) {
      try {
        const data = await userRequest.get("/hotels");
        commit("getHotelDate", data);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async submitHotel(_, params) {
      try {
        const data = await userRequest.post("/hotels", params);
        return Promise.resolve(data);
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
});
