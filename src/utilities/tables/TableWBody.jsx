const TableWBody = ({ tableClassName, tbodyClassName, children }) => {
  return (
    <table className={tableClassName}>
      <tbody className={tbodyClassName}>{children}</tbody>
    </table>
  );
};

export default TableWBody;
