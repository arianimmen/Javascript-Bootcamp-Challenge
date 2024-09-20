// Config our axios
const app = axios.create({
  baseURL: "http://localhost:3000/",
});

class Storage {
  async searchAndSort(value, isDesc, sortBy) {
    const status = isDesc ? "desc" : "asc";
    try {
      const response = await app.get(
        `transactions?refId_like=${value}&_sort=${sortBy}&_order=${status}`
      );
      return response.data;
    } catch (error) {
      alert(error);
    }
  }
}

export default new Storage();
