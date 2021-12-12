import * as React from 'react';
import { Modal as MuiModal, Box, Menu, MenuItem, Fade, TextField, Button } from "@mui/material";
import { ModalProps } from '../../model/Model';

import { DefaultItemsModel } from '../../model/Model';
import { formattedDate } from '../../util/formattedDate';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './ModalStyles.scss'

const Modal: React.FC<ModalProps> = (props) => {
    const { item, columns, columnId, setColumn, setOpen } = props

    const [ mode, setMode ] = React.useState<string>('view');

    const [ updatedItem, setUpdatedItem ] = React.useState<DefaultItemsModel>({
        id: ' ',
        title: ' ',
        description: ' ',
        date: formattedDate
    });

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    React.useEffect(() => {
        if (item.id.length !== 0) {
            setUpdatedItem(item)
        }
    }, [item]);


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

    const openMenu = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
      setAnchorEl(null);
    }; 

    const updateHandler = (): void => {
        setMode('edit')
        setAnchorEl(null)
    }
  
    const viewHandler = (): void => {
        setMode('view')
        setAnchorEl(null)
    }

    const deleteTodo = (id : string): any => {
        let newItems: DefaultItemsModel[] = [];

        if (foundColumn) {
            newItems = foundItems.filter(item => item.id !== id)
            setColumn({
                ...columns,
                 [columnId]: {
                    name: foundColumn[1].name,
                    items: newItems
                 }   
            })
        }
        setOpen(false)
        setAnchorEl(null)
     }

    const onUpdate = (): any => {
        if (foundColumn) {
            const updatedItemArray = [{...updatedItem}]
            
            const newItems = foundItems.map(item => updatedItemArray.find(i => i.id === item.id) || item)
            console.log(newItems)


            setColumn({
                ...columns,
                [columnId]: {
                    name: foundColumn[1].name,
                    items: newItems
                }
            })
        }
        setOpen(false)
        setAnchorEl(null)
        setMode('view')
    }

    return(
        <React.Fragment>
        <MuiModal   
            open={props.open}
            onClose={props.onClose}
        >
            <Box className='box'>
                <button className='box__moreIcon' onClick={handleClick}>
                    <MoreHorizIcon />
                </button>
                <h2 className='box__type'>{props.columnType}</h2>
                {
                    mode === 'view' ?
                    <React.Fragment>
                        <h1 className='box__title'>{item.title}</h1>
                        <p className='box__description'>{item.description}</p>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <TextField 
                            variant='standard'
                            value={updatedItem.title}
                            onChange={(e) => setUpdatedItem({...updatedItem, title: e.target.value})}
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
                            value={updatedItem.description}
                            onChange={(e) => setUpdatedItem({...updatedItem, description: e.target.value})}
                            label='Description'
                            placeholder='Enter the description'
                            sx={{
                                width: '175%'
                            }}
                        />
                    </React.Fragment>

                }

                {
                    mode === 'edit' &&
                    <div className='box__btn-group' onClick={onUpdate}>
                        <Button variant='text' sx={{marginRight: '5px'}} onClick={props.onClose}>Cancel</Button>
                        <Button variant='contained'>Update</Button>
                    </div>
                }
            </Box>
        </MuiModal>
            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                TransitionComponent={Fade}
                className='menu'
            >
                {
                    mode === 'view' ?
                    <MenuItem className='menu__menuItem' onClick={updateHandler}>
                        <EditIcon />
                        <p>Edit</p>
                    </MenuItem>
                    :
                    <MenuItem className='menu__menuItem' onClick={viewHandler}>
                        <VisibilityIcon />
                        <p>View</p>
                    </MenuItem>     
                }
                
                <MenuItem className='menu__menuItem' onMouseUp={() => deleteTodo(item.id)}>
                    <DeleteIcon fontSize='small'/>
                    <p>Delete</p>
                </MenuItem>

            </Menu>
        </React.Fragment>
    )
}

export default Modal;