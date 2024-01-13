import React, { useEffect, useState } from 'react';

import { StyledAddTransactionButton } from './TransactionsList.styled';
import ModalAddTransactions from 'components/ModalAddTransactions/ModalAddTransactions';
import TransactionMobile from './TransactionMobile/TransactionMobile';
import TransactionsDashboard from './TransactionDashboard/TransactionsDashboard';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { fetchTransactionsThunk } from 'store/Transactions/transactionsThunk';

export const formatCurrency = number => {
  return Math.abs(number)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$& ');
};

const TransactionsList = () => {
  const dispatch = useDispatch();

  const [isAddTransactionOpen, setIsTransactionOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactionsThunk());
  }, [dispatch]);

  //const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const isTabletScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobileScreen = useMediaQuery({ query: '(max-width: 767.98px)' });

  return (
    <div>
      {isTabletScreen && <TransactionsDashboard />}
      {isMobileScreen && <TransactionMobile />}

      <StyledAddTransactionButton onClick={() => setIsTransactionOpen(true)}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 0V20" stroke="white" strokeWidth="2" />
          <path d="M0 10L20 10" stroke="white" strokeWidth="2" />
        </svg>
      </StyledAddTransactionButton>
      {isAddTransactionOpen && (
        <ModalAddTransactions close={setIsTransactionOpen} />
      )}
    </div>
  );
};

export default TransactionsList;
