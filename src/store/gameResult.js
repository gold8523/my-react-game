import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'gameResult',
  initialState: {
    winner: {},
  },
  reducers: {
    player1Win: () => ({
      winner: 'player1',
    }),
    player2Win: () => ({
      winner: 'player2',
    }),
    noWinner: () => ({
      winner: 'draw',
    }),
    cleanWinner: () => ({
      winner: {},
    }),
  },
});

export const { player1Win, player2Win, noWinner, cleanWinner } = slice.actions;

export const resultData = state => state.gameResult.winner;

export default slice.reducer;
