import React, { useState, useEffect, useRef } from 'react';
import { FASTEST_METHODS } from '../lessonsData';

const TopperSprintArena = ({ activeLesson, quizQuestionIdx, quizAttempts, quizFeedback, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef(null);

  const currentQKey = `${activeLesson.id}_${quizQuestionIdx}`;
  const attempts = quizAttempts[currentQKey] || 0;
  const isTimerActive = attempts < 3 && quizFeedback === null;

  // Clean interval tick that doesn't trigger parent re-renders
  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            onTimeout();
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive, onTimeout]);

  const method = FASTEST_METHODS[activeLesson.id] || {};

  return (
    <div className="fastest-method-card animate-slide-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="hero-badge" style={{ background: 'hsl(var(--warning) / 0.15)', color: 'hsl(var(--warning))' }}>Topper Sprint Mode</span>
        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'hsl(var(--secondary))' }}>Topper Pick: Method {method.preferred || 'B'}</span>
      </div>
      
      {isTimerActive && (
        <div style={{ background: 'hsl(var(--destructive) / 0.1)', border: '1px solid hsl(var(--destructive) / 0.3)', color: 'hsl(var(--destructive))', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontWeight: '800' }}>
          <span>⏱ TOPPER SPRINT TIMER:</span>
          <span className="animate-pulse">{timeLeft}s Remaining</span>
        </div>
      )}

      <h4 className="tip-title" style={{ fontSize: '1.05rem', margin: 0 }}>Fastest Known Method Comparison</h4>
      <p style={{ fontSize: '0.78rem', color: 'hsl(var(--text-muted))', margin: 0 }}>
        {method.preferredReason}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ border: '1px solid hsl(var(--border-line))', borderRadius: '8px', padding: '10px', background: 'hsl(var(--bg-main) / 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: '800', marginBottom: '4px' }}>
            <span>Method A: Traditional</span>
            <span style={{ color: 'hsl(var(--destructive))' }}>{method.speed}</span>
          </div>
          <p style={{ fontSize: '0.74rem', lineHeight: '1.4', margin: 0 }}>{method.traditional}</p>
        </div>

        <div style={{ border: '1.5px solid hsl(var(--primary) / 0.5)', borderRadius: '8px', padding: '10px', background: 'hsl(var(--primary) / 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: '800', marginBottom: '4px', color: 'hsl(var(--primary))' }}>
            <span>Method B: Vedic (Topper Preferred)</span>
            <span style={{ color: 'hsl(var(--primary))' }}>{method.vedicSpeed}</span>
          </div>
          <p style={{ fontSize: '0.74rem', lineHeight: '1.4', margin: 0 }}>{method.vedic}</p>
        </div>

        <div style={{ border: '1px solid hsl(var(--border-line))', borderRadius: '8px', padding: '10px', background: 'hsl(var(--bg-main) / 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: '800', marginBottom: '4px' }}>
            <span>Method C: Approximation</span>
            <span style={{ color: 'hsl(var(--warning))' }}>{method.approxSpeed}</span>
          </div>
          <p style={{ fontSize: '0.74rem', lineHeight: '1.4', margin: 0 }}>{method.approx}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopperSprintArena);
