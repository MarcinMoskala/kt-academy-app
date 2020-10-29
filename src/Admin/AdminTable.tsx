import React from "react";
import MUIDataTable from "mui-datatables";

type ColumnDefinition<T> = {
    name: keyof T,
    label: string,
    options?: {
        filter?: boolean,
        sort?: boolean,
        filterList?: string[],
        sortOrder?: "asc"|"desc"
    }
}

export function AdminTable<T>({title, list, columns, clicked}: { title: string, list: T[], columns: ColumnDefinition<T>[], clicked?: (element: T) => void }) {
    const listToShow = list.map(element => {
        const copy = {...element}

        Object.keys(copy).forEach(function (key) {
            const value = copy[key]

            if (!value) {
                copy[key] = "";
            } else if (typeof value === "object") {
                copy[key] = JSON.stringify(value);
            }

        });

        return copy
    })


    return <>
        {list &&
        <MUIDataTable title={title} data={listToShow} options={{
            filterType: 'checkbox',
            selectableRows: 'multiple',
            rowsPerPage: 100,
            selectableRowsOnClick: false,
            isRowSelectable: () => false,
            onCellClick: (colData: any, cellMeta: { colIndex: number, rowIndex: number, dataIndex: number }) => {
                if (clicked) clicked(list[cellMeta.dataIndex])
            }
        }} columns={columns}/>
        }
    </>
}