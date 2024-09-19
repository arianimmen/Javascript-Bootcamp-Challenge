import storage from "./storage.js";

//------------- Table Container -----------------
const tableContainer = document.querySelector(".tbody");

// -------------  Sorting Btns ------------------
const dateSortBtn = document.querySelector(".dateTh");
const priceSortBtn = document.querySelector(".priceTh");

// ----------------- Search ---------------------
const searchInput = document.querySelector("#search");

let isSortedByDateDesc = 1;
let isSortedByPriceDesc = 1;

let isSortedByDate = 1;
let isSortedByPrice = 0;

class Transaction {
  // Starting up the Transaction
  async setApp() {
    this.addEventListeners();

    Transaction.btnSelect(); // Selecting Transactions date (make it bold)

    Transaction.searchLogic();
  }

  addEventListeners() {
    dateSortBtn.addEventListener("click", this.sortDateBtnLogic);
    priceSortBtn.addEventListener("click", this.sortPriceBtnLogic);
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value;
      Transaction.searchLogic(value);
    });
  }

  static updateDOM(data) {
    let resultHTML = ` `;
    let row = 1;

    data.forEach((item) => {
      resultHTML += Transaction.createHTML(item, row);
      row += 1;
    });

    tableContainer.innerHTML = resultHTML; // Updating the DOM
  }

  async sortDateBtnLogic() {
    // Checking if it is being activated so we don't toggle it and show the default
    if (!isSortedByDate) {
      isSortedByDateDesc = 1;
      dateSortBtn.classList.remove("rotate");
      priceSortBtn.classList.remove("rotate");
    } else {
      // Toggling our sort icon and sort
      isSortedByDateDesc = !isSortedByDateDesc;
      dateSortBtn.classList.toggle("rotate");
    }

    // Changing the global values
    isSortedByDate = 1;
    isSortedByPrice = 0;

    // Selecting our clicked sort method
    Transaction.btnSelect();

    Transaction.searchLogic(); // Updating the DOM
  }

  async sortPriceBtnLogic() {
    // Checking if it is being activated so we don't toggle it and show the default
    if (!isSortedByPrice) {
      isSortedByPriceDesc = 1;
      dateSortBtn.classList.remove("rotate");
      priceSortBtn.classList.remove("rotate");
    } else {
      // Toggling our sort icon and sort
      isSortedByPriceDesc = !isSortedByPriceDesc;
      priceSortBtn.classList.toggle("rotate");
    }

    // Changing the global values
    isSortedByPrice = 1;
    isSortedByDate = 0;

    // Selecting our clicked sort method
    Transaction.btnSelect();

    Transaction.searchLogic(); // Updating the DOM
  }

  static async searchLogic(value = searchInput.value) {
    // Checking the current Status and updating the DOM
    switch (isSortedByDate) {
      case 1:
        const dataSortedByDate = await storage.searchAndSort(
          value,
          isSortedByDateDesc,
          "date"
        );
        Transaction.updateDOM(dataSortedByDate);
        break;
      case 0:
        const dataSortedByPrice = await storage.searchAndSort(
          value,
          isSortedByPriceDesc,
          "price"
        );
        Transaction.updateDOM(dataSortedByPrice);
        break;
    }
  }

  // Selecting the selected filter (make the selected filter bold)
  static btnSelect() {
    if (isSortedByDate) {
      dateSortBtn.classList.add("selected");
      priceSortBtn.classList.remove("selected");
    } else {
      priceSortBtn.classList.add("selected");
      dateSortBtn.classList.remove("selected");
    }
  }

  // Creating the html for each of our data
  static createHTML(data, row) {
    return `
    <tr>
        <td>${row}</td>
        <td class=${data.type == "برداشت از حساب" ? "red" : "green"}>${
      data.type
    }</td>
        <td class="price">${data.price.toLocaleString()}</td>
        <td>${data.refId}</td>
        <td>${Transaction.converToReadableDate(data.date)}</td>
    </tr>`;
  }

  // Conver the data to readable format in Persian language
  static converToReadableDate(data) {
    const time = new Date(data).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const date = new Date(data).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return `${date} ساعت ${time}`;
  }
}

export default new Transaction();
