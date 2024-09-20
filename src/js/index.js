import Transaction from "./Transaction.js";

// ---------------- Selecting from HTML ------------------------------
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

  Transaction.setApp();
});
