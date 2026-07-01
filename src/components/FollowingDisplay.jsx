import React, { useState, useEffect } from 'react';
import styles from './FollowingDisplay.module.css';

const FollowingDisplay = () => {
  const [followingList, setFollowingList] = useState([]);
  const [username, setUsername] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Carrega dados do localStorage
    const profile = JSON.parse(localStorage.getItem('current_profile') || '{}');
    const storedUsername = localStorage.getItem('current_username') || '';
    
    setUsername(storedUsername);
    setFollowingList(profile.following_list || []);
  }, []);

  if (!followingList || followingList.length === 0) {
    return null;
  }

  const displayList = isExpanded ? followingList : followingList.slice(0, 5);

  return (
    <div className={styles.followingContainer}>
      <div className={styles.followingHeader}>
        <div className={styles.headerIcon}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div className={styles.headerText}>
          <h3 className={styles.headerTitle}>Seguindo</h3>
          <p className={styles.headerSubtitle}>
            @{username} segue {followingList.length} {followingList.length === 1 ? 'pessoa' : 'pessoas'}
          </p>
        </div>
      </div>

      <div className={styles.followingList}>
        {displayList.map((user, index) => (
          <div key={index} className={styles.followingItem}>
            <div className={styles.userAvatar}>
              <img 
                src={user.profile_pic_url} 
                alt={user.username}
                onError={(e) => {
                  e.target.src = `https://i.pravatar.cc/150?u=${user.username}`;
                }}
              />
              {user.is_private && (
                <div className={styles.privateBadge}>
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"/>
                  </svg>
                </div>
              )}
            </div>
            
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                <span className={styles.username}>@{user.username}</span>
                {user.is_verified && (
                  <svg className={styles.verifiedBadge} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )}
              </div>
              <div className={styles.fullName}>{user.full_name}</div>
            </div>

            <button className={styles.viewButton}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {followingList.length > 5 && (
        <button 
          className={styles.expandButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <span>Ver menos</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/>
              </svg>
            </>
          ) : (
            <>
              <span>Ver todos ({followingList.length})</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default FollowingDisplay;
