import Storage from "./storage.js";
import Transaction from "./Transaction.js";

const transactionsBtn = document.querySelector(".main__transactionsBtn");
const searchForm = document.querySelector(".header__searchForm");
const transactionsSection = document.querySelector(
  ".main__transactions__section"
);

document.addEventListener("DOMContentLoaded", () => {
  transactionsBtn.addEventListener("click", () => {
    transactionsBtn.classList.add("--searchBar-hidden");
    searchForm.classList.remove("--searchBar-hidden");
    transactionsSection.classList.remove("--transactions-hidden");
  });
});

Transaction.setApp();
