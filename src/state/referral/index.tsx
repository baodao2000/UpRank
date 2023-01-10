import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  refLink: '',
  totalRef: 0,
}

const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    setRefLink: (state, action) => {
      state.refLink = action.payload
    },
    setTotalRef: (state, action) => {
      state.totalRef = action.payload
    },
  },
})

export const { setRefLink, setTotalRef } = referralSlice.actions

export default referralSlice.reducer
