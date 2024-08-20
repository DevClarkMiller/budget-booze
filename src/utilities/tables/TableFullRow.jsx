const TableFullRow = (props) => {
    return(
        <tr {...props.trProps}>
            <th {...props.thProps}>{props.th}</th>
            {props.children}
        </tr>
    );
}

export default TableFullRow