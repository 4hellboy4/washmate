import React from 'react';
import './BookBtn.css';

interface BookBtnProps {
  onClick: () => void;
}

const BookBtn: React.FC<BookBtnProps> = ({ onClick }) => {
  return (
    <div className="bookbtn" onClick={onClick}>
      <h1 className="book">BOOK</h1>
    </div>
  );
};

export default BookBtn;
