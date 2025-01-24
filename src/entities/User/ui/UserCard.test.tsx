import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('renders with avatar if avatarUrl is provided', () => {
    render(
      <UserCard
        name="John Doe"
        email="john@example.com"
        avatarUrl="http://example.com/avatar.jpg"
      />,
    );
    const avatar = screen.getByAltText("John Doe's avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'http://example.com/avatar.jpg');
  });

  it('renders with default avatar icon if avatarUrl is not provided', () => {
    render(<UserCard name="John Doe" email="john@example.com" />);
    const defaultAvatar = screen.getByLabelText('Default user avatar');
    expect(defaultAvatar).toBeInTheDocument();
  });

  it('renders name and email', () => {
    render(<UserCard name="John Doe" email="john@example.com" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders fallback for missing name and email', () => {
    render(<UserCard />);
    expect(screen.getByText('No Name')).toBeInTheDocument();
    expect(screen.getByText('No Email')).toBeInTheDocument();
  });

  it('calls onEdit when edit icon is clicked', () => {
    const handleEdit = jest.fn();
    render(<UserCard name="John Doe" email="john@example.com" onEdit={handleEdit} />);
    const editIcon = screen.getByLabelText('Edit user');
    fireEvent.click(editIcon);
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete icon is clicked', () => {
    const handleDelete = jest.fn();
    render(<UserCard name="John Doe" email="john@example.com" onDelete={handleDelete} />);
    const deleteIcon = screen.getByLabelText('Delete user');
    fireEvent.click(deleteIcon);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
