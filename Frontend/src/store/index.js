import { createStore } from "vuex";
import axios from "axios";
const userRequest = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  data: { test: "test" },
});
export default createStore({
  state: {
    hotelData: [],
  },
  mutations: {
    getHotelData(state, payload) {
      state.hotelData = payload;
    },
  },
  actions: {
    async getHotel({ commit }) {
      try {
        const { data } = await userRequest.get("/hotels");
        commit("getHotelData", data);
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

    async sortHotels({ commit }, sort) {
      let url = `hotels/sort`;
      if (sort.price) {
        url = `hotels/sort?price=${sort.price}`;
      } else if (sort.appraise) {
        url = `hotels/sort?appraise=${sort.appraise}`;
      }
      try {
        const { data } = await userRequest.post(url, sort.checkList);
        commit("getHotelData", data.meta);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
});
