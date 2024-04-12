
export interface props {
    children: React.ReactNode;
    sortable: boolean;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
  }