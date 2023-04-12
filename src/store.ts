import { atom, useAtom } from "jotai";

const sortTodosBy = atom<"desc" | "asc">("desc");

export const useSortTodosBy = () => useAtom(sortTodosBy);
