import React, { useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface PaginationProps {
  total: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
const PaginationComponent = (props: PaginationProps) => {
  const { total, currentPage, setCurrentPage } = props;

  return (
    <Pagination
      className="ant-pagination !mt-2 max-[350px]:!mt-0"
      pageSize={10}
      onChange={setCurrentPage}
      align="center"
      current={currentPage}
      total={total}
      prevIcon={
        <div className="h-7 w-fit px-3 flex gap-1 items-center select-none max-[450px]:hidden">
          <CaretLeft className="w-4 h-4 object-cover text-foreground" />
          <span>Previous</span>
        </div>
      }
      nextIcon={
        <div className="h-7 w-fit px-3 flex gap-1 items-center select-none max-[450px]:hidden">
          <span>Next</span>
          <CaretRight className="w-4 h-4 object-cover text-foreground" />
        </div>
      }
    />
  );
};

export default PaginationComponent;
