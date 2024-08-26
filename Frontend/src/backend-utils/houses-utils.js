import axios from "axios";
import { formatErrors } from "./handle-errors";

export const fetchTrendingHouses = async () => {
  try {
    const response = await axios.get("houses/trending");
    const houses = response.data.message.data;

    return {
      houses,
    };
  } catch (err) {
    console.log("fetchTrendingHouses");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const fetchCategoryHouses = async (limit) => {
  try {
    let url = "houses/category/all";
    if (limit) {
      limit = 6;
      url += `?limit=${limit}`;
    }

    const response = await axios.get(url);
    const categoryHouses = response.data.message.data;

    return {
      categoryHouses,
    };
  } catch (err) {
    console.log("fetchCategoryHouses");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const getPostsByUserId = async (userId) => {
  try {
    const response = await axios.get(`houses?postedBy=${userId}`);
    const houses = response.data.message.data;
    return {
      houses,
    };
  } catch (err) {
    console.log("getPostsByUserId");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const getHousesByCategory = async (categoryId) => {
  try {
    let url = `houses?category=${categoryId}`;
    const response = await axios.get(url);
    const houses = response.data.message.data;

    return {
      houses,
    };
  } catch (err) {
    console.log("getHousesByCategory");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const searchHouses = async (query, filter) => {
  try {
    let filters = filter.map((el) => `&${el.key}=${el.value}`);
    let url = `houses/search?q=${query}${filters}`;
    url = url.replace(",", "");
    console.log(url);
    const response = await axios.get(url);
    const houses = response.data.message.data;

    return {
      houses,
    };
  } catch (err) {
    console.log("searchHouses");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const getOneHouse = async (id) => {
  try {
    const response = await axios.get(`houses/${id}`);
    const house = response.data.message.data;
    return {
      house,
    };
  } catch (err) {
    console.log("getOneHouse");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};
