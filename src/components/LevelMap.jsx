import React from 'react';
import { LESSONS } from '../lessonsData';

const ROADMAP_COORDINATES = [
  { x: 300, y: 80, align: 'right' },
  { x: 420, y: 200, align: 'left' },
  { x: 300, y: 320, align: 'right' },
  { x: 180, y: 440, align: 'right' },
  { x: 300, y: 560, align: 'left' },
  { x: 420, y: 680, align: 'left' },
  { x: 300, y: 800, align: 'right' },
  { x: 180, y: 920, align: 'right' },
  { x: 300, y: 1040, align: 'left' },
  { x: 420, y: 1160, align: 'left' },
  { x: 300, y: 1280, align: 'right' },
  { x: 180, y: 1400, align: 'right' }
];

const LevelMap = ({ completedLessons, onNodeClick }) => {
  return (
    <div className="section-box" style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
      <div className="roadmap-container">
        {/* SVG Winding Road Path */}
        <svg className="roadmap-svg" width="600" height="1500" viewBox="0 0 600 1500">
          {/* Background track (Locked/Gray path) */}
          <path
            d="M 300 80 C 450 140, 450 140, 420 200 C 390 260, 330 260, 300 320 C 270 380, 210 380, 180 440 C 150 500, 270 500, 300 560 C 330 620, 450 620, 420 680 C 390 740, 330 740, 300 800 C 270 860, 210 860, 180 920 C 150 980, 270 980, 300 1040 C 330 1100, 450 1100, 420 1160 C 390 1220, 330 1220, 300 1280 C 270 1340, 210 1340, 180 1400"
            className="roadmap-path-bg"
          />
          {/* Active completed track (Teal dash path) */}
          <path
            d="M 300 80 C 450 140, 450 140, 420 200 C 390 260, 330 260, 300 320 C 270 380, 210 380, 180 440 C 150 500, 270 500, 300 560 C 330 620, 450 620, 420 680 C 390 740, 330 740, 300 800 C 270 860, 210 860, 180 920 C 150 980, 270 980, 300 1040 C 330 1100, 450 1100, 420 1160 C 390 1220, 330 1220, 300 1280 C 270 1340, 210 1340, 180 1400"
            className="roadmap-path-active"
            style={{
              strokeDasharray: '12 8',
              stroke: 'hsl(var(--primary))',
              opacity: completedLessons.length > 0 ? 0.9 : 0.1
            }}
          />
        </svg>

        {/* Level Nodes */}
        {LESSONS.map((lesson, idx) => {
          const coords = ROADMAP_COORDINATES[idx] || { x: 300, y: 80, align: 'right' };
          const isUnlocked = idx === 0 || completedLessons.includes(lesson.id - 1);
          const isCompleted = completedLessons.includes(lesson.id);
          
          let nodeClass = "locked";
          if (isCompleted) nodeClass = "completed";
          else if (isUnlocked) nodeClass = "unlocked";

          return (
            <div
              key={lesson.id}
              className="roadmap-node-wrapper"
              style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
            >
              <button
                onClick={() => {
                  if (isUnlocked) {
                    onNodeClick(lesson);
                  }
                }}
                className={`roadmap-node-btn ${nodeClass}`}
                disabled={!isUnlocked}
                aria-label={`Lesson ${lesson.id}: ${lesson.title}`}
              >
                {isCompleted ? '✔' : isUnlocked ? idx + 1 : '🔒'}
              </button>
              <div className={`roadmap-node-card ${coords.align}`}>
                <span className="node-subject">{lesson.subject}</span>
                <h4 className="node-title">{lesson.title}</h4>
                <p className="node-snippet">{lesson.desc}</p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                  <span className="badge badge-outline">{lesson.category.toUpperCase()}</span>
                  {isCompleted && <span className="badge badge-success">Completed</span>}
                  {!isCompleted && isUnlocked && <span className="badge badge-primary">Start</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(LevelMap);
