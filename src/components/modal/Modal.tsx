import * as React from 'react';
import { Modal as MuiModal, Box, Menu, MenuItem, Fade, TextField } from "@mui/material";
import { ModalProps } from '../../model/Model';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './ModalStyles.scss'

const Modal: React.FC<ModalProps> = (props) => {
    const { item } = props
    const [ mode, setMode ] = React.useState<string>('view');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const openMenu = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
      setAnchorEl(null);
    }; 

    const updateHandler = (): void => {
        setMode('edit')
    }
  
    const viewHandler = (): void => {
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
                        <hr className='box__hr'/> 
                        <p className='box__description'>{item.description}</p>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <TextField 
                            variant='standard'
                            fullWidth
                            value={item.title}
                            placeholder='Enter the title'
                            label='Title'
                            sx={{
                                margin: '1rem 0'
                            }}
                        />
                        <TextField 
                            variant='standard'
                            multiline
                            fullWidth
                            maxRows={4}
                            value={item.description}
                            label='Description'
                            placeholder='Enter the description'
                            
                        />
                    </React.Fragment>

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
                
                <MenuItem className='menu__menuItem'>
                    <DeleteIcon fontSize='small'/>
                    <p>Delete</p>
                </MenuItem>

            </Menu>
        </React.Fragment>
    )
}

export default Modal;