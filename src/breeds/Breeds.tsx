//Import React & Redux Functiosn
import { useEffect, useState } from 'react';

// Import 3rd Party Packages
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Import Hooks
import { useAppSelector, useAppDispatch } from '../app/hooks';

// Import Slices
import { fetchBreeds, selectTableOne, selectTableTwo } from './breedsSlice';

// Import Reducers
import { dropHandler } from './breedsSlice';

// Import MUI Components
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Stack,
  Typography,
  Backdrop,
  createTheme,
  ThemeProvider,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#FCA311' },
    secondary: { main: '#4A6DB8' },
    background: { paper: '#C17767' },
  },
});

export function Breeds() {
  const dispatch = useAppDispatch();
  const breedStatus = useAppSelector(state => state.breeds.status);
  const TableOneData = useAppSelector(selectTableOne);
  const TableTwoData = useAppSelector(selectTableTwo);
  const [BackdropOpen, setBackdropOpen] = useState(false);

  useEffect(() => {
    if (breedStatus === 'idle') {
      dispatch(fetchBreeds());
    }
  }, [breedStatus, dispatch]);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    const sourceTable =
      source.droppableId === '1' ? TableOneData : TableTwoData;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (sourceTable.length > 1) {
      dispatch(
        dropHandler({
          source,
          destination,
          entryData: sourceTable[source.index],
        }),
      );
    } else {
      setBackdropOpen(true);
    }
  };

  return Object.keys(TableOneData).length === 0 ? (
    <Typography variant='h1'>Loading</Typography>
  ) : (
    <ThemeProvider theme={theme}>
      <Backdrop
        open={BackdropOpen}
        onClick={() => setBackdropOpen(!BackdropOpen)}
        sx={{ color: 'primary.main' }}
      >
        <Typography variant='h2'>Woof Invalid Action Woof</Typography>
      </Backdrop>

      <DragDropContext onDragEnd={onDragEnd}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 8, md: 16 }}
        >
          <Table
            sx={{
              maxWidth: 600,
              minWidth: 300,
              color: 'secondary.main',
              backgroundColor: 'background.paper',
            }}
          >
            <TableHead>Breed Table 1</TableHead>
            <Droppable droppableId='1'>
              {provided => (
                <TableBody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {TableOneData.map(
                    (entry: { id: string; breed: string }, index: number) => (
                      <Draggable
                        draggableId={entry.id}
                        index={index}
                        key={entry.id}
                      >
                        {provided => (
                          <TableRow
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{entry.breed}</TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ),
                  )}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
          <Table sx={{ maxWidth: 600, minWidth: 300 }}>
            <TableHead>Breed Table 2</TableHead>
            <Droppable droppableId='2'>
              {provided => (
                <TableBody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {TableTwoData.map(
                    (entry: { id: string; breed: string }, index: number) => (
                      <Draggable
                        draggableId={entry.id}
                        index={index}
                        key={entry.id}
                      >
                        {provided => (
                          <TableRow
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{entry.breed}</TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ),
                  )}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </Stack>
      </DragDropContext>
    </ThemeProvider>
  );
}
