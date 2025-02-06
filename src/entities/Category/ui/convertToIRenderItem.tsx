import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';
import { CategoryCard } from './CategoryCard';
import { Category } from '../types/category';

interface ConvertProps {
  category: Category;
  onClick?: (id: string) => void;
}

export const convertToIRenderItem = ({ category, onClick }: ConvertProps): IRenderItem => ({
  key: category.id,
  render: () => (
    <CategoryCard category={category} onClick={onClick ? () => onClick(category.id) : undefined} />
  ),
});
