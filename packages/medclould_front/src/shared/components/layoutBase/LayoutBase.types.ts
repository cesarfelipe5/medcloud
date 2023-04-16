import { ReactNode } from "react";

// export type TLayoutBase = {
//   children: ReactNode;
//   title: string;
// } & (
//   | { showNewButton?: false }
//   | {
//       showNewButton: true;
//       onClickButton?: () => void;
//     }
// );

export type TLayoutBase = {
  children: ReactNode;
  title: string;
  searchTerm?: string;
  onClickButton?: () => void;
  onSearch?: (searchTerm: string) => void;
} & (
  | {
      showNewButton?: false;
    }
  | {
      showNewButton: true;
      onClickButton: () => void;
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
      }
  );
