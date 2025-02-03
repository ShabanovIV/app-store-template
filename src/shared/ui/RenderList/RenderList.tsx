import React, { forwardRef, memo, ReactNode } from 'react';
import styles from './RenderList.module.scss';

export interface IRenderItem {
  key: string;
  render: () => ReactNode;
}

export interface IRenderListProps {
  isGrid?: boolean;
  items: IRenderItem[];
  lastItemRef?: React.RefObject<HTMLLIElement | null>;
  onLastItemChanged: (key: string) => void;
}

export const RenderList: React.FC<IRenderListProps> = ({
  isGrid,
  items,
  lastItemRef,
  onLastItemChanged,
}) => {
  if (items.length === 0) {
    return <div className={styles.empty}>No items to display</div>;
  }

  const memoItems = items.map((item, index) => (
    <MemoizedListItem
      key={item.key}
      item={item}
      ref={setRefForLast({ items, index, onLastItemChanged, lastItemRef })}
    />
  ));

  return <ul className={`${styles.list} ${isGrid ? styles.listGrid : ''}`}>{memoItems}</ul>;
};

type ListItemProps<TItem> = {
  item: TItem;
};

const ListItem = forwardRef<HTMLLIElement, ListItemProps<IRenderItem>>(({ item }, ref) => (
  <li id={item.key} ref={ref} className={styles.listItem}>
    {item.render()}
  </li>
));

ListItem.displayName = 'ListItem';

const MemoizedListItem = memo(ListItem);

const setRefForLast = ({
  items,
  index,
  onLastItemChanged,
  lastItemRef,
}: {
  items: IRenderItem[];
  index: number;
  onLastItemChanged: (key: string) => void;
  lastItemRef?: React.RefObject<HTMLLIElement | null>;
}) => {
  return (element: HTMLLIElement | null) => {
    if (index === items.length - 1 && lastItemRef) {
      lastItemRef.current = element;
      onLastItemChanged(items[items.length - 1].key);
    }
  };
};
