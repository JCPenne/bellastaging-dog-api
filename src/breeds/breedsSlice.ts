import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    sameTableDrop: (state = initialState, action) => {
      const { sourceIndex, destinationIndex, entryData } = action.payload;

      state.breedTableOne.splice(sourceIndex, 1);
      state.breedTableOne.splice(destinationIndex, 0, entryData);
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

export const { sameTableDrop } = breedsSlice.actions;

export default breedsSlice.reducer;
