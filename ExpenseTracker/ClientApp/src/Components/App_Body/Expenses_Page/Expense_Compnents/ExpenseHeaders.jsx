import React from 'react';
import { useTheme,useMediaQuery } from '@mui/material';
import { BoxContainer, GridContainer, RowContainer, BreakText, Category, Description } from './DesignComponents';



export function ExpenseHeaders({ setSorting, currentSort }) {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const titleSort = () => (a, b) => a.title.localeCompare(b.title);
  const priceSort = () => (a, b) => parseFloat(a.price) - parseFloat(b.price);
  const dateSort = () => (a, b) => a.date.localeCompare(b.date);

  const handleSortTitle = () => {
    currentSort.toString() === titleSort().toString()
      ? setSorting(() => (a, b) => b.title.localeCompare(a.title))
      : setSorting(titleSort);
  };

  const handleSortPrice = () => {
    if (currentSort.toString() === priceSort().toString()) {
      setSorting(() => (a, b) => parseFloat(b.price) - parseFloat(a.price));
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
    <BoxContainer sx={{backgroundColor: '#BEF0D7',borderRadius:'8px',}}>
      <GridContainer>
        {!isSmallScreen ? (
          <>
            <Category className="break-text">Category</Category>
            <BreakText className="break-text" >Title</BreakText>
            <BreakText className="break-text">Price</BreakText>
            <BreakText className="break-text" >Date</BreakText>
          </>
        ) : (
          <>
            <RowContainer>
              <Category className="break-text">Category</Category>
              <BreakText className="break-text" sx={{ mr:6 }}>Price</BreakText>
              <BreakText className="break-text">Date</BreakText>
            </RowContainer>
            <RowContainer>
              <BreakText className="break-text" sx={{paddingLeft: theme.spacing(2.5) }}>Title</BreakText>
            </RowContainer>
          </>
        )}
      </GridContainer>
    </BoxContainer>
  );
  



}

