import { Category } from 'src/entities/Category/types/category';
import { CategoryCard } from 'src/entities/Category/ui/CategoryCard';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';

interface ConvertProps {
  category: Category;
  onClick?: (id: string) => void;
}

export const convertCategoryToItem = ({ category, onClick }: ConvertProps): IRenderItem => ({
  key: category.id,
  render: () => (
    <CategoryCard category={category} onClick={onClick ? () => onClick(category.id) : undefined} />
  ),
});
