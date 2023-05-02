import '../../../../Styles/ExpenseNav.css' 

import React, { useState, useEffect } from "react";

export function ExpenseNav({ setSorting, currentSort }) {
  const titleSort = () => (a, b) => a.title.localeCompare(b.title);
  const priceSort = () => (a, b) => {
    const currencyOrder = ["$", "₪"];
    const aIndex = currencyOrder.indexOf(a.currency);
    const bIndex = currencyOrder.indexOf(b.currency);
    if (aIndex === bIndex) {
      const aPrice = parseFloat(a.price);
      const bPrice = parseFloat(b.price);
      return bPrice - aPrice;
    } else {
      return aIndex - bIndex;
    }
  };
  const dateSort = () => (a, b) => a.date.localeCompare(b.date);

  const handleSortTitle = () => {
    currentSort.toString() === titleSort().toString()
      ? setSorting(() => (a, b) => b.title.localeCompare(a.title))
      : setSorting(titleSort);
  };
  const handleSortPrice = () => {
    if (currentSort.toString() === priceSort().toString()) {
      const currencyOrder = ["$", "₪"];
      setSorting(() => (a, b) => {
        const aIndex = currencyOrder.indexOf(a.currency);
        const bIndex = currencyOrder.indexOf(b.currency);
        if (aIndex === bIndex) {
          const aPrice = parseFloat(a.price);
          const bPrice = parseFloat(b.price);
          return aPrice - bPrice;
        } else {
          return aIndex - bIndex;
        }
      });
    } else {
      setSorting(priceSort);
    }
  };
  const handleSortDate = () => {
    if (currentSort.toString() === dateSort().toString()) {
      setSorting(() => (a, b) => b.date.localeCompare(a.date));
    } else {
      setSorting(dateSort);
    }
  };
  return (
    <div className="expense-nav">
      <div className="expense-category" onClick={handleSortDate}>
        Category
      </div>
      <div className="expense-title" onClick={handleSortTitle}>
        Title
      </div>
      <div className="expense-price" onClick={handleSortPrice}>
        Price
      </div>
      <div className="expense-date" onClick={handleSortDate}>
        Date
      </div>
    </div>
  );
}