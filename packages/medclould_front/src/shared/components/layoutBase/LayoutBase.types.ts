import { ReactNode } from "react";

export type TLayoutBase = {
  children: ReactNode;
  title: string;
  searchTerm?: string;
  onClickNewButton?: () => void;
  onSearch?: (searchTerm: string) => void;
  onClickSearch?: () => void;
} & (
  | {
      showNewButton?: false;
    }
  | {
      showNewButton: true;
      onClickNewButton: () => void;
    }
) &
  (
    | {
        showSearchBar?: false;
      }
    | {
        showSearchBar: true;
        onSearch: (searchTerm: string) => void;
        searchTerm: string;
        onClickSearch: () => void;
      }
  );
