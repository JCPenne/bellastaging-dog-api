//Import React & Redux Functiosn
import { useEffect } from 'react';

// Import Hooks
import { useAppSelector, useAppDispatch } from '../app/hooks';

// Import Slices
import { fetchBreeds, selectTableOne, selectTableTwo } from './breedsSlice';

// Import MUI Components
import {
  List,
  ListItem,
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  Stack,
} from '@mui/material';

export function Breeds() {
  const dispatch = useAppDispatch();
  const breedStatus = useAppSelector(state => state.breeds.status);
  const TableOneData = useAppSelector(selectTableOne);
  const TableTwoData = useAppSelector(selectTableTwo);
  console.log(TableOneData);
  useEffect(() => {
    if (breedStatus === 'idle') {
      dispatch(fetchBreeds());
    }
  }, [breedStatus, dispatch]);

  {
    return TableOneData.length > 0 ? (
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 8, md: 16 }}
      >
        <Table sx={{ maxWidth: 600, minWidth: 300 }}>
          <TableHead>Table 1</TableHead>
          <TableBody>
            {TableOneData.map((breed: string) => (
              <TableRow>
                <TableCell>{TableOneData.indexOf(breed) + 1}</TableCell>
                <TableCell>{breed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Table sx={{ maxWidth: 600, minWidth: 300 }}>
          <TableHead>Table 2</TableHead>
          <TableBody>
            {TableTwoData.map((breed: string) => (
              <TableRow>
                <TableCell>{TableTwoData.indexOf(breed) + 1}</TableCell>
                <TableCell>{breed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    ) : (
      <h1>loading</h1>
    );
  }
}
