class Storage {
  async searchAndSort(value, isDesc, sortBy) {
    const status = isDesc ? "desc" : "asc";
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions?refId_like=${value}&_sort=${sortBy}&_order=${status}`
      );
      return response.data;
    } catch (error) {
      console.log(err);
    }
  }
}

export default new Storage();
