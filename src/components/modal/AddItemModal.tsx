import React, { useState } from 'react';
import { Modal as MuiModal, Box,TextField, Button } from '@mui/material';
import { v4 as uuid } from 'uuid';

import { AddModalProps, DefaultItemsModel } from '../../model/Model';
import { formattedDate } from '../../util/formattedDate';

import './ModalStyles.scss'

const AddItemModal: React.FC<AddModalProps> = (props) => {
    const {  columns, columnId, setOpen } = props

    const [ newItem, setNewItem ] = useState<DefaultItemsModel>({
        id: uuid(),
        title: '',
        description:'',
        date: formattedDate
    })

    const column: [string, {
        name: string;
        items: DefaultItemsModel[];
    }][]= Object.entries(columns);

    //Found Column
    const foundColumn: [string, {
        name: string;
        items: DefaultItemsModel[];
    }] | undefined = column.find(colItem => colItem[0] === columnId);

    //Found Items
    let foundItems: DefaultItemsModel[];
    if (foundColumn){
        foundItems = foundColumn[1].items;
    }

    const handleSubmit = ():void => {
        foundItems.push(newItem)
        setOpen(false)
    }

    return (
        <React.Fragment>
        <MuiModal  
            open={props.open}
            onClose={props.onClose}
        >
            <Box className='box'>
                <h2 className='box__type'>Add To Do</h2>

                    <React.Fragment>
                        <TextField 
                            variant='standard'
                            value={newItem.title}
                            onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                            placeholder='Enter the title'
                            label='Title'
                            sx={{
                                marginTop: '1rem',
                                marginBottom: '2rem',
                                width: '150%'
                            }}
                        />
                        <TextField 
                            variant='standard'
                            multiline
                            minRows={4}
                            maxRows={10}
                            value={newItem.description}
                            onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                            label='Description'
                            placeholder='Enter the description'
                            sx={{
                                width: '175%'
                            }}
                        />
                    </React.Fragment>
                    <div className='box__btn-group'>
                        <Button variant='text' sx={{marginRight: '5px'}} onClick={props.onClose}>Cancel</Button>
                        <Button variant='contained' onClick={handleSubmit}>Save</Button>
                    </div>
            </Box>
        </MuiModal>
        </React.Fragment>
    )
}

export default AddItemModal;