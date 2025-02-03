import { IRenderItem } from 'src/shared/ui/RenderList/RenderList';
import { CategoryCard } from './CategoryCard';
import { Category } from '../types/category';

interface ConvertProps {
  category: Category;
  onClick?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const convertToIRenderItem = ({
  category,
  onClick,
  onEdit,
  onDelete,
}: ConvertProps): IRenderItem => ({
  key: category.id,
  render: () => (
    <CategoryCard
      category={category}
      onClick={onClick ? () => onClick(category.id) : undefined}
      onEdit={onEdit ? () => onEdit(category.id) : undefined}
      onRemove={onDelete ? () => onDelete(category.id) : undefined}
    />
  ),
});
