import React, { useEffect, useState } from 'react';
import { useCollaboration } from '../context/CollaborationContext';

interface RemoteCursorsProps {
  page: string; // 'ideation' or 'storyboard'
}

const RemoteCursors: React.FC<RemoteCursorsProps> = ({ page }) => {
  const { cursors } = useCollaboration();
  const [visibleCursors, setVisibleCursors] = useState<Array<{
    userId: string;
    x: number;
    y: number;
    initial: string;
    color: string;
    name: string;
  }>>([]);

  useEffect(() => {
    // Filter cursors for the current page
    const currentPageCursors = Array.from(cursors.values())
      .filter(cursor => cursor.page === page)
      .map(cursor => ({
        userId: cursor.userId,
        x: cursor.x,
        y: cursor.y,
        initial: cursor.user.initial,
        color: cursor.user.color,
        name: cursor.user.name
      }));

    setVisibleCursors(currentPageCursors);
  }, [cursors, page]);

  return (
    <>
      {visibleCursors.map(cursor => (
        <div
          key={cursor.userId}
          className="remote-cursor"
          style={{
            position: 'absolute',
            left: cursor.x,
            top: cursor.y,
            pointerEvents: 'none',
            zIndex: 10000,
            transition: 'all 0.1s ease-out'
          }}
        >
          {/* Cursor SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            <path
              d="M5.65376 12.3673L8.84426 15.5578L11.4768 20.0277C11.6251 20.3051 11.9615 20.4177 12.2389 20.2694C12.2949 20.2396 12.3426 20.1981 12.3795 20.1481L13.8441 18.0862C14.0123 17.8572 14.2998 17.7557 14.5782 17.8293L18.4421 18.9684C18.7421 19.0479 19.0526 18.8834 19.132 18.5835C19.1426 18.5412 19.1479 18.4973 19.1479 18.4533V5.33716C19.1479 4.99752 18.8718 4.72141 18.5322 4.72141C18.4882 4.72141 18.4443 4.7267 18.402 4.73729L5.63274 8.23657C5.33268 8.31601 5.16822 8.62647 5.24766 8.92653C5.27817 9.04413 5.34256 9.14958 5.43347 9.23046L5.65376 12.3673Z"
              fill={cursor.color}
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* User initial badge */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: '20px',
              backgroundColor: cursor.color,
              color: 'white',
              borderRadius: '12px',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
              userSelect: 'none'
            }}
          >
            {cursor.initial}
          </div>

          {/* User name tooltip (shown on hover would require different approach, shown always for now) */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: '42px',
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: 'white',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '10px',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              opacity: 0.8
            }}
          >
            {cursor.name}
          </div>
        </div>
      ))}
    </>
  );
};

export default RemoteCursors;
