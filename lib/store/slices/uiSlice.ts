import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { UIState } from "@/lib/types"

const initialState: UIState = {
  selectedColumn: null,
  activeModal: null,
  sidebarOpen: false,
  theme: "dark",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedColumn: (state, action: PayloadAction<string | null>) => {
      state.selectedColumn = action.payload
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload
    },
  },
})

export const { setSelectedColumn, setActiveModal, toggleSidebar, setTheme } = uiSlice.actions

export default uiSlice.reducer

