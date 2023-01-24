//Import React & Redux Functiosn
import { useEffect } from 'react';

// Import 3rd Party Packages
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Import Hooks
import { useAppSelector, useAppDispatch } from '../app/hooks';

// Import Slices
import { fetchBreeds, selectTableOne, selectTableTwo } from './breedsSlice';

// Import Reducers
import { sameTableDrop } from './breedsSlice';

// Import MUI Components
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Stack,
} from '@mui/material';

export function Breeds() {
  const dispatch = useAppDispatch();
  const breedStatus = useAppSelector(state => state.breeds.status);
  const TableOneData = useAppSelector(selectTableOne);
  const TableTwoData = useAppSelector(selectTableTwo);

  useEffect(() => {
    if (breedStatus === 'idle') {
      dispatch(fetchBreeds());
    }
  }, [breedStatus, dispatch]);

  const onDragEnd = (result: any) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      dispatch(
        sameTableDrop({
          sourceIndex: source.index,
          destinationIndex: destination.index,
          entryData: TableOneData[source.index],
        }),
      );
    }
  };

  return Object.keys(TableOneData).length > 0 ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 8, md: 16 }}
      >
        <Table sx={{ maxWidth: 600, minWidth: 300 }}>
          <TableHead></TableHead>
          <Droppable droppableId='Table 1'>
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
        {/* <<<<<<<<<<<< Second Table >>>>>>>>>>>> */}
        <Table sx={{ maxWidth: 600, minWidth: 300 }}>
          <TableHead></TableHead>
          <Droppable droppableId='Table 2'>
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
  ) : (
    <h1>Loading</h1>
  );
}
