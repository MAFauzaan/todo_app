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

export interface ModalProps {
    columnType: string,
    item: DefaultItemsModel,
    open: boolean,
    onClose: () => void
}