import React from "react";

export interface DefaultItemsModel {
    id:  any,
    title: string,
    description: string,
    date: string
}

export interface ColumnModel {
    [id: string]: {
        name: string,
        items: DefaultItemsModel[]
    }
}

export interface AddModalProps {
    columnType: string,
    open: boolean,
    onClose: () => void,
    columns: ColumnModel,
    columnId: string,
    setColumn: React.Dispatch<React.SetStateAction<ColumnModel>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>

}

export interface ModalProps {
    columnType: string,
    item: DefaultItemsModel,
    open: boolean,
    onClose: () => void,
    columns: ColumnModel,
    columnId: string,
    setColumn: React.Dispatch<React.SetStateAction<ColumnModel>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}