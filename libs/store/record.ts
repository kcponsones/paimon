import { create } from "zustand";
import { RecordDataProps, RecordFilterListProps, RecordFunction, RecordStoreState } from "../helpers/types";
import { mountStoreDevtool } from "simple-zustand-devtools";


const initialState: RecordStoreState = {
    records: [],
    currentPage: 1,
    paginationNumbers: [],
    isPreviousPagination: false,
    isNextPagination: true,
    recordFilter: 'All',
    recordListFilter: []
}

export const recordStore = create<RecordStoreState & RecordFunction>((set, get) => ({
    ...initialState,
    setRecordsData: (records: RecordDataProps[]) => {
        set({records: records})
    },
    setCurrentNumber: (currentNumber: number) => {
        set({currentPage: currentNumber})
    },
    setPaginationNumbers: (paginationNum: number[]) => {
        set({paginationNumbers: paginationNum})
    },
    setPaginationButton: (isSet: boolean, type: string) => {
        type === 'next' ? set({isNextPagination: isSet}) : set({isPreviousPagination: isSet})
    },
    setRecordFilter: (filter: string) => {
        set({recordFilter: filter})

        let fillterRecords = get().records.filter(data => {
            if(filter == 'All'){
                return true
            }
            else{
                return data.arena.name.toLowerCase().includes(filter.toLowerCase());
            }
        })

        set({records: fillterRecords})
    },
    setRecordListFilter: (filterList: RecordFilterListProps[]) => {
        set({recordListFilter: filterList})
    }
}))

mountStoreDevtool('RecordStore', recordStore);