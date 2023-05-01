import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PAGE_SIZE } from "./utils/constants";

const sortTodosBy = atom<"desc" | "asc">("desc");

const pageSize = atomWithStorage<number>("page-size", PAGE_SIZE);

export const useSortTodosBy = () => useAtom(sortTodosBy);
export const usePageSize = () => useAtom(pageSize);
