import * as React from 'react';
import { Container, Grid, Paper, ThemeProvider, createTheme } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Column } from './dnd/Column';
import { ColumnModel, DefaultItemsModel } from './model/Model';

import Modal from './components/modal/Modal';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import "./App.scss"


const App: React.FC = () => { 

  const [ columns, setColumn ] = React.useState<ColumnModel>(Column);
  const [ columnType, setColumnType ] = React.useState<string>('')
  const [ open, setOpen ] = React.useState<boolean>(false);
  const [ item, setItem ] = React.useState<DefaultItemsModel>({
    id: '',
    title: '',
    description: '',
    date: ''
  })

  const openModalHandler = (item: DefaultItemsModel, name: string):void => {
    setColumnType(name)
    setItem(item)
    setOpen(true)
  }

  
  const closeModalHandler = ():void => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Container>
        <div className="header">
          <h1>My Todo</h1>
        </div>
        <Grid container spacing={5} className='container'>
        <DragDropContext onDragEnd={result => console.log(result)}>
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
                            <MoreVertIcon sx={{
                              position: 'absolute',
                              top: '1rem',
                              right: '1rem',
                              '&:hover': {
                                cursor: 'pointer'
                              }
                            }}/>
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
                                            onClick={() => openModalHandler(item, column.name)}                                          
                                            sx={{
                                              backgroundColor: snapshot.isDragging ? '#9d9f99' : '#ffff'
                                            }}
                                            className='container__gridItem__todoColumnContainer__paper'
                                          > 
                                            <h3>{item.title}</h3>
                                            {/* <Typography variant="body1">{item.description}</Typography> */}
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
        </DragDropContext>
      </Grid>
    </Container>
    <Modal columnType={columnType} item={item} open={open} onClose={closeModalHandler}/>
  </React.Fragment>
  )
}

export default App;