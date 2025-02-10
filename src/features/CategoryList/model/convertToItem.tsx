import { Category, CategoryCard } from 'src/entities/Category';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';

export const convertToItem = (category: Category, onClick: () => void): IRenderItem => ({
  key: category.id,
  render: () => <CategoryCard category={category} onClick={onClick} />,
});
