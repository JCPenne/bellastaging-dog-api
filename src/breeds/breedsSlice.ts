import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fillTables } from './fillTables';

type BreedState = {
  breedTableOne: object[];
  breedTableTwo: object[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

const initialState: BreedState = {
  breedTableOne: [],
  breedTableTwo: [],
  status: 'idle',
  error: undefined,
};

export const breedsSlice = createSlice({
  name: 'breeds',
  initialState: initialState,
  reducers: {
    dropHandler: (state = initialState, action) => {
      const { source, destination, entryData } = action.payload;

      const sourceTable =
        source.droppableId === '1' ? state.breedTableOne : state.breedTableTwo;
      const destinationTable =
        destination.droppableId === '1'
          ? state.breedTableOne
          : state.breedTableTwo;


      sourceTable.splice(source.index, 1);
      destinationTable.splice(destination.index, 0, entryData);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBreeds.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const data = fillTables(action.payload.message);
        state.breedTableOne = data[0];
        state.breedTableTwo = data[1];
      })
      .addCase(fetchBreeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const fetchBreeds = createAsyncThunk('breeds/fetchbreeds', async () => {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  return response.json();
});

export const selectTableOne = (state: any) => state.breeds.breedTableOne;
export const selectTableTwo = (state: any) => state.breeds.breedTableTwo;

export const { dropHandler } = breedsSlice.actions;

export default breedsSlice.reducer;
