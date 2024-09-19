class Storage {
  // Getting all of the data from API
  async getAlldata() {
    try {
      const response = await axios.get("http://localhost:3000/transactions");
      return response.data;
    } catch (error) {
      console.log(err);
    }
  }

  // Getting the searched data based on the input
  async searchData(input) {
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions?refId_like=${input}`
      );
      return response.data;
    } catch (error) {
      console.log(err);
    }
  }

  // Sorting data by Price
  async sortByPrice(isDesc = 1) {
    const status = isDesc ? "desc" : "asc";

    try {
      const response = await axios.get(
        `http://localhost:3000/transactions?_sort=price&_order=${status}`
      );
      return response.data;
    } catch (error) {
      console.log(err);
    }
  }

  // Sorting data by Price
  async sortByDate(isDesc = 1) {
    const status = isDesc ? "desc" : "asc";
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions?_sort=date&_order=${status}`
      );
      return response.data;
    } catch (error) {
      console.log(err);
    }
  }
}

export default new Storage();
