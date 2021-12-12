import * as React from 'react';
import { Container, Grid, Paper, Menu, MenuItem, Fade } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

import { DefaultItems } from './dnd/DefaultItems'
import { ColumnModel, DefaultItemsModel } from './model/Model';

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Modal from './components/modal/Modal';
import AddItemModal from './components/modal/AddItemModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';  

import "./App.scss"

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};


const App: React.FC = () => { 

  const [ columnId, setColumnId ] = React.useState<string>(' ')

  const [ columns, setColumn ] = React.useState<ColumnModel>({
    [uuid()]: {
        name: "To do",
        items: DefaultItems
      },
      [uuid()]: {
        name: "Doing",
        items: []
      },
      [uuid()]: {
        name: "Finished",
        items: []
      }
});

  const [ columnType, setColumnType ] = React.useState<string>('')
  const [ openDetail, setOpenDetail ] = React.useState<boolean>(false);
  const [ openAddItem, setOpenAddItem ] = React.useState<boolean>(false);

  const [ item, setItem ] = React.useState<DefaultItemsModel>({
    id: '',
    title: '',
    description: '',
    date: ''
  })

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  }; 

  const openModalHandler = (item: DefaultItemsModel, name: string, id:string):void => {
    setColumnType(name)
    setColumnId(id)
    setItem(item)
    setOpenDetail(true)

  }

  const closeModalHandler = ():void => {
    setOpenDetail(false)
  }

  const openAddModal = (): void => {
    setOpenAddItem(true)
    setAnchorEl(null)
  }

  const closeAddModal = (): void => {
    setOpenAddItem(false)
  }

  return (
    <React.Fragment>
      <Container>
        <div className="header">
          <PlaylistAddCheckIcon fontSize='large' sx={{marginRight: '.5rem', color: '#ffff'}} />
          <h1>My Todo</h1>
        </div>
        <Grid container spacing={5} className='container'>
        <DragDropContext  onDragEnd={result => onDragEnd(result, columns, setColumn)}>
          {
            Object.entries(columns).map(([id, column]) => {
              return (
                <Droppable key={id} droppableId={id}>
                    {(provided, snapshot) => {
                      return (
                        <Grid item xs={12} md={4} className='container__gridItem'>
                          <div 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className='container__gridItem__todoColumnContainer'
                          >
                            <h2>{column.name}</h2>
                            {
                              column.name === 'To do' &&
                              <button onClick={handleClick} style={{
                                  position: 'absolute',
                                  top: '1rem',
                                  right: '1rem',
                                  cursor: 'pointer',
                                  background: 'transparent',
                                  border: 'none'
                              }}>
                                <MoreVertIcon />
                              </button>
                            }
                            {
                              column.items.map((item, index) => {
                                return (
                                  <Draggable 
                                    key={item.id} 
                                    draggableId={item.id} 
                                    index={index}
                                  >
                                      {(provided, snapshot) => {
                                        return (
                                          <Paper 
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}  
                                            onClick={() => openModalHandler(item, column.name, id)}                                          
                                            sx={{
                                              backgroundColor: snapshot.isDragging ? '#9d9f99' : '#ffff'
                                            }}
                                            className='container__gridItem__todoColumnContainer__paper'
                                          > 
                                            <h2>{item.title}</h2>
                                            <p>{item.date}</p>
                                          </Paper>
                                        )
                                      }}
                                  </Draggable>
                                )
                              })
                            }
                          </div>
                        </Grid>
                      )
                    }}
                </Droppable>
              )
            })  
          }
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                TransitionComponent={Fade}
                className='menu'
                >
                <MenuItem onClick={() => openAddModal()}>
                  <AddIcon /> 
                  <p style={{fontFamily: 'Nunito Sans'}}>Add Todo</p>
                </MenuItem>
              </Menu>
        </DragDropContext>
      </Grid>
    </Container>

    {
      openAddItem ?
      <AddItemModal 
        columnType={columnType} 
        open={openAddItem} 
        onClose={closeAddModal}
        columns={columns}
        columnId={columnId}
        setColumn={setColumn}
        setOpen={setOpenAddItem}
      />
      :
      <Modal 
        columnType={columnType} 
        item={item} 
        open={openDetail} 
        onClose={closeModalHandler}
        columns={columns}
        columnId={columnId}
        setColumn={setColumn}
        setOpen={setOpenDetail}
      />
    }
  </React.Fragment>
  )
}

export default App;