import React, { forwardRef, memo } from 'react';
import { IRenderItem } from './IRenderItem';
import styles from './RenderList.module.scss';

export interface IRenderListProps {
  items: IRenderItem[];
  lastItemRef?: React.RefObject<HTMLLIElement | null>;
  onLastItemChanged?: (key: string) => void;
}

export const RenderList: React.FC<IRenderListProps> = ({
  items,
  lastItemRef,
  onLastItemChanged,
}) => {
  if (items.length === 0) {
    return <div className={styles.empty}>No items to display</div>;
  }

  return (
    <ul className={styles.listGrid}>
      {items.map((item, index) => (
        <ItemMemo
          key={item.key}
          item={item}
          ref={setRefForLast({ items, index, lastItemRef, onLastItemChanged })}
        />
      ))}
    </ul>
  );
};

type ListItemProps = {
  item: IRenderItem;
};

const ItemRef = forwardRef<HTMLLIElement, ListItemProps>(({ item }, ref) => (
  <li id={item.key} ref={ref} className={styles.listItem}>
    {item.render()}
  </li>
));
ItemRef.displayName = 'ItemRef';

const ItemMemo = memo(ItemRef);

const setRefForLast = ({
  items,
  index,
  lastItemRef,
  onLastItemChanged,
}: {
  items: IRenderItem[];
  index: number;
  onLastItemChanged?: (key: string) => void;
  lastItemRef?: React.RefObject<HTMLLIElement | null>;
}) => {
  return (element: HTMLLIElement | null) => {
    if (index === items.length - 1 && lastItemRef) {
      lastItemRef.current = element;
      if (onLastItemChanged) {
        onLastItemChanged(items[items.length - 1].key);
      }
    }
  };
};
