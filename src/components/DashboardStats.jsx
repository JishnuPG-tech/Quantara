import React, { useMemo } from 'react';

const IconBrain = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IconSparkles = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>;
const IconClock = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

const DashboardStats = ({ completedLessons, streak, mistakeFingerprints }) => {
  // Memoize recommendation logic to avoid heavy calculations during parent renders
  const recommendation = useMemo(() => {
    const { negativeSigns, inequalityDirection, carryDigits, onlyAFew } = mistakeFingerprints;
    const maxVal = Math.max(negativeSigns, inequalityDirection, carryDigits, onlyAFew);
    
    if (maxVal === 0) {
      return "Keep solving! Clear any question tests to generate custom retraining recommendations.";
    }
    if (maxVal === negativeSigns) {
      return "Pay close attention to quadratic root signs. Double check constant sign switches before solving comparisons!";
    }
    if (maxVal === inequalityDirection) {
      return "When evaluating coded inequalities, trace open/closed gates from source to target. Block immediately on gate flips!";
    }
    if (maxVal === onlyAFew) {
      return "Syllogisms with 'Only a few' mean both 'Some' and 'Some Not'. Always draw directional Venn restrictions!";
    }
    return "Vedic multiplication carry-digits can get messy. Keep scratch workspace structured to avoid simple additions slips!";
  }, [mistakeFingerprints]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* HUD Bar Display */}
      <div className="hud-bar">
        <div className="hud-item">
          <div className="hud-icon">
            <IconBrain />
          </div>
          <div className="hud-details">
            <span className="hud-title">Curriculum Progress</span>
            <span className="hud-value">{completedLessons.length} / 12 Mastered</span>
          </div>
        </div>

        <div className="hud-item">
          <div className="hud-icon secondary">
            <IconSparkles />
          </div>
          <div className="hud-details">
            <span className="hud-title">Total XP Earned</span>
            <span className="hud-value">{completedLessons.length * 100} XP</span>
          </div>
        </div>

        <div className="hud-item">
          <div className="hud-icon" style={{ background: 'hsl(var(--warning) / 0.08)', borderColor: 'hsl(var(--warning) / 0.3)', color: 'hsl(var(--warning))' }}>
            <IconClock />
          </div>
          <div className="hud-details">
            <span className="hud-title">Daily Study Streak</span>
            <span className="hud-value">{streak} Days 🔥</span>
          </div>
        </div>
      </div>

      {/* Retraining HUD Card */}
      <div className="retraining-hud-card animate-slide-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div className="hud-icon secondary" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconBrain />
          </div>
          <h3 style={{ fontSize: '0.98rem', fontWeight: '800', margin: 0 }}>Mistake Fingerprint Radar</h3>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'hsl(var(--text-muted))', marginBottom: '14px' }}>
          Our Adaptive OS analyzes your quiz submissions to catalog conceptual blindspots. Keep these logs clear, aspirant!
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '14px' }}>
          <div className="radar-stat-box" style={{ background: 'hsl(var(--bg-main) / 0.5)', padding: '8px', borderRadius: '6px', fontSize: '0.74rem', border: '1px solid hsl(var(--border-line))' }}>
            <span style={{ display: 'block', color: 'hsl(var(--text-muted))', fontWeight: '600' }}>Negative Signs</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: mistakeFingerprints.negativeSigns > 2 ? 'hsl(var(--destructive))' : 'hsl(var(--text-primary))' }}>
              {mistakeFingerprints.negativeSigns} Hits
            </span>
          </div>
          <div className="radar-stat-box" style={{ background: 'hsl(var(--bg-main) / 0.5)', padding: '8px', borderRadius: '6px', fontSize: '0.74rem', border: '1px solid hsl(var(--border-line))' }}>
            <span style={{ display: 'block', color: 'hsl(var(--text-muted))', fontWeight: '600' }}>Inequality Direction</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: mistakeFingerprints.inequalityDirection > 2 ? 'hsl(var(--destructive))' : 'hsl(var(--text-primary))' }}>
              {mistakeFingerprints.inequalityDirection} Hits
            </span>
          </div>
          <div className="radar-stat-box" style={{ background: 'hsl(var(--bg-main) / 0.5)', padding: '8px', borderRadius: '6px', fontSize: '0.74rem', border: '1px solid hsl(var(--border-line))' }}>
            <span style={{ display: 'block', color: 'hsl(var(--text-muted))', fontWeight: '600' }}>Carry Digits</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: mistakeFingerprints.carryDigits > 2 ? 'hsl(var(--destructive))' : 'hsl(var(--text-primary))' }}>
              {mistakeFingerprints.carryDigits} Hits
            </span>
          </div>
          <div className="radar-stat-box" style={{ background: 'hsl(var(--bg-main) / 0.5)', padding: '8px', borderRadius: '6px', fontSize: '0.74rem', border: '1px solid hsl(var(--border-line))' }}>
            <span style={{ display: 'block', color: 'hsl(var(--text-muted))', fontWeight: '600' }}>Only a Few Rules</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: mistakeFingerprints.onlyAFew > 2 ? 'hsl(var(--destructive))' : 'hsl(var(--text-primary))' }}>
              {mistakeFingerprints.onlyAFew} Hits
            </span>
          </div>
        </div>
        <div style={{ background: 'hsl(var(--primary) / 0.05)', border: '1.5px solid hsl(var(--primary) / 0.2)', padding: '10px', borderRadius: '8px', fontSize: '0.74rem' }}>
          <span style={{ fontWeight: '800', color: 'hsl(var(--primary))', display: 'block', marginBottom: '4px' }}>🔥 Retraining Recommendation:</span>
          {recommendation}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardStats);
