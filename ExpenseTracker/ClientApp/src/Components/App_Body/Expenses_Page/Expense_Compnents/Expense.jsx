import React, { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { BoxContainer, GridContainer, RowContainer, BreakText, Category, Description } from '../../../../Styles/ExpenseDesign';


export function Expense({ expense }) {
  const { title, price, date, currency ,expenseCategory} = expense;
  const [optionVisibility, setOptionVisibility] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const showOptions = () => setOptionVisibility(!optionVisibility);

  const userLocale = navigator.language;
  const dateObj = new Date(date);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(dateObj);

  return (
    <BoxContainer>
      <GridContainer onClick={showOptions}>
        {!isSmallScreen ? (
          <>
            <Category className="break-text">{expenseCategory.name}</Category>
            <BreakText className="break-text">{title}</BreakText>
            <BreakText className="break-text">{currency}{price}</BreakText>
            <BreakText className="break-text">{formattedDate}</BreakText>
          </>
        ) : (
          <>
            <RowContainer>
              <Category className="break-text">{expenseCategory.name}</Category>
              <BreakText className="break-text">{currency}{price}</BreakText>
              <BreakText className="break-text" >{formattedDate}</BreakText>
            </RowContainer>
            <RowContainer>
              <Description className="break-text" sx={{paddingLeft: 2 }}>{title}</Description>
            </RowContainer>
          </>
        )}
      </GridContainer>
    </BoxContainer>
  );
}







