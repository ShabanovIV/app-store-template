import React from 'react';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './UserCard.module.scss';

interface UserCardProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ name, email, avatarUrl, onEdit, onDelete }) => {
  return (
    <div className={styles.userCard}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={`${name || 'User'}'s avatar`} className={styles.avatar} />
      ) : (
        <UserOutlined className={styles.defaultAvatarIcon} aria-label="Default user avatar" />
      )}
      <div className={styles.info}>
        <h3 className={styles.name}>{name || 'No Name'}</h3>
        <p className={styles.email}>{email || 'No Email'}</p>
      </div>
      <div className={styles.actions}>
        {onEdit && (
          <EditOutlined onClick={onEdit} className={styles.actionIcon} aria-label="Edit user" />
        )}
        {onDelete && (
          <DeleteOutlined
            onClick={onDelete}
            className={styles.actionIcon}
            aria-label="Delete user"
          />
        )}
      </div>
    </div>
  );
};
