import React from 'react';

const RetrainingSandbox = ({ attempts, onRetry, onReplayWhiteboard, onRevealHint, onSolveStepByStep }) => {
  if (attempts === 1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        <div className="coach-speech-bubble" style={{ borderLeft: '4px solid hsl(var(--destructive))', background: 'hsl(var(--destructive) / 0.05)', padding: '12px', marginTop: '0', borderRadius: '8px' }}>
          <span style={{ fontWeight: '800', color: 'hsl(var(--destructive))', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase' }}>Stage 1 Correction</span>
          <p style={{ fontSize: '0.78rem', lineHeight: '1.4', margin: '4px 0 0 0' }}>
            Check the calculation steps. You might have missed a sign transition. Replay the whiteboard steps first!
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onReplayWhiteboard}
            className="glass-btn glass-btn-secondary"
            style={{ flex: 1, fontSize: '0.74rem' }}
          >
            Replay Whiteboard Steps
          </button>
          <button
            onClick={onRetry}
            className="glass-btn glass-btn-outline"
            style={{ flex: 1, fontSize: '0.74rem' }}
          >
            Retry Directly
          </button>
        </div>
      </div>
    );
  }

  if (attempts === 2) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        <div className="retraining-sandbox-overlay" style={{ background: 'hsl(var(--secondary) / 0.05)', border: '1.5px dashed hsl(var(--secondary) / 0.3)', padding: '16px', borderRadius: '12px' }}>
          <span style={{ fontWeight: '800', color: 'hsl(var(--secondary))', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>Stage 2: Retraining Sandbox Active</span>
          <p style={{ fontSize: '0.78rem', lineHeight: '1.4', margin: '0 0 12px 0' }}>
            No panic! Let's build up your concept model with 2 quick guided micro-examples:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.74rem', background: 'hsl(var(--bg-main) / 0.5)', padding: '10px', borderRadius: '8px', border: '1px solid hsl(var(--border-line))', marginBottom: '12px' }}>
            <div>
              <strong>Micro-Example 1:</strong> Simplify (45% of 200). Split mentally: 10% is 20. 40% is 80. 5% is 10. 80 + 10 = 90.
            </div>
            <div style={{ borderTop: '1px solid hsl(var(--border-line))', paddingTop: '6px', marginTop: '6px' }}>
              <strong>Micro-Example 2:</strong> Solve x² - 5x + 6 = 0. Constant is +6, product of roots = +6. x factors are -2, -3. Roots are +2, +3.
            </div>
          </div>
          <button
            onClick={onRetry}
            className="glass-btn glass-btn-secondary"
            style={{ width: '100%', fontSize: '0.74rem' }}
          >
            Verify Sandbox & Return to Quiz
          </button>
        </div>
      </div>
    );
  }

  // Stage 3+ (attempts >= 3)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <div className="coach-speech-bubble" style={{ borderLeft: '4px solid hsl(var(--warning))', background: 'hsl(var(--warning) / 0.05)', padding: '12px', marginTop: '0', borderRadius: '8px' }}>
        <span style={{ fontWeight: '800', color: 'hsl(var(--warning))', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase' }}>Stage 3: Slow Coach Mode (Timer Removed)</span>
        <p style={{ fontSize: '0.78rem', lineHeight: '1.4', margin: '4px 0 0 0' }}>
          Let's slow right down. There is no timer pressure here. Let's isolate the root steps:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
          <button
            onClick={() => onRevealHint('concept')}
            className="glass-btn glass-btn-outline"
            style={{ padding: '4px 8px', fontSize: '0.68rem', width: 'fit-content' }}
          >
            Reveal Concept Clue 🔍
          </button>
          <button
            onClick={() => onRevealHint('options')}
            className="glass-btn glass-btn-outline"
            style={{ padding: '4px 8px', fontSize: '0.68rem', width: 'fit-content' }}
          >
            Reveal Options Clue 💡
          </button>
        </div>
      </div>
      
      <button
        onClick={onSolveStepByStep}
        className="glass-btn glass-btn-primary"
        style={{ width: '100%', fontSize: '0.74rem' }}
      >
        Solve Step-by-Step
      </button>
    </div>
  );
};

export default React.memo(RetrainingSandbox);
