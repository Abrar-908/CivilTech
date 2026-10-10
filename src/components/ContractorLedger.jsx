import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  Upload, 
  DollarSign, 
  FileCheck, 
  ShieldAlert, 
  ChevronRight,
  TrendingDown,
  Building
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function ContractorLedger({ projects, onUpdateProjectMilestone }) {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 'CW-101');
  const [showProofModal, setShowProofModal] = useState(false);
  const [activeMilestoneId, setActiveMilestoneId] = useState(null);
  const [proofNote, setProofNote] = useState('');

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const dept = DEPARTMENTS[currentProject.department] || {};

  const handleOpenSubmitProof = (milestoneId) => {
    setActiveMilestoneId(milestoneId);
    setShowProofModal(true);
  };

  const handleConfirmProofSubmission = (e) => {
    e.preventDefault();
    if (!activeMilestoneId) return;

    onUpdateProjectMilestone(currentProject.id, activeMilestoneId, {
      status: 'Completed',
      proofUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80',
      note: proofNote
    });

    setShowProofModal(false);
    setProofNote('');

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (_) {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Header Card */}
      <div className="civic-card" style={{ background: 'linear-gradient(135deg, rgba(24,34,52,0.95), rgba(15,23,42,0.98))' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="brand-badge">Accountability Ledger & SLA Enforcer</span>
              <span style={{ fontSize: '0.75rem', color: '#60a5fa' }}>• Geo-Fenced Proof of Work</span>
            </div>
            <h2 style={{ fontSize: '1.35rem' }}>Contractor Milestone & Budget Transparency</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem', maxWidth: '750px' }}>
              Eliminating "phantom roadwork" and stalled projects. Taxpayer funds are disbursed strictly against 
              <strong> timestamped, GPS-verified photographic evidence</strong> for each milestone. Unjustified delays trigger automated liquidated damages penalties.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--bg-input)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', minWidth: '180px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Delay Penalties Levied</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f87171' }}>₹1,45,000</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Auto-deducted from payouts</div>
            </div>

            <div style={{ background: 'var(--bg-input)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', minWidth: '180px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Contractor SLA</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>88.6%</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Quality & Schedule Compliance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.25rem' }}>
        
        {/* Left Column: Project Selector List */}
        <div className="civic-card" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', height: 'fit-content' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', padding: '0.4rem 0.6rem', borderBottom: '1px solid var(--border-subtle)' }}>
            Active Contract Works ({projects.length})
          </div>

          {projects.map((p) => {
            const isSelected = p.id === selectedProjectId;
            const pDept = DEPARTMENTS[p.department] || {};

            return (
              <div 
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'rgba(59,130,246,0.12)' : 'var(--bg-input)',
                  border: isSelected ? '1px solid #3b82f6' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.7rem', color: pDept.color, fontWeight: 700 }}>
                    {p.id} • {pDept.shortName}
                  </span>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    padding: '1px 6px', 
                    borderRadius: '4px',
                    background: p.status === 'Delayed' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.15)',
                    color: p.status === 'Delayed' ? '#f87171' : '#34d399',
                    fontWeight: 700
                  }}>
                    {p.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '0.35rem' }}>
                  {p.title}
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  🏢 {p.contractor.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Work Order Dossier & Milestones Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Work Order Info Card */}
          <div className="civic-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <span className={`dept-pill ${currentProject.department}`}>{dept.name}</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.35rem' }}>{currentProject.title}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  📍 {currentProject.roadName} — <strong>{currentProject.ward}</strong>
                </div>
              </div>

              {/* Delay Penalty Badge if applicable */}
              {currentProject.delayPenalty > 0 && (
                <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)', textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: '#f87171', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertOctagon size={13} /> SLA Breach Penalty Levied
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fca5a5' }}>
                    -₹{currentProject.delayPenalty.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Liquidated Damages for 18 days delay</div>
                </div>
              )}
            </div>

            {/* Contractor Specs & Budget Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Contractor Entity</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{currentProject.contractor.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Lic: {currentProject.contractor.licenseId}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Sanctioned Budget</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#10b981' }}>
                  ₹{(currentProject.budget / 100000).toFixed(1)} Lakhs
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Disbursed: ₹{(currentProject.budgetDisbursed / 100000).toFixed(1)} Lakhs ({Math.round((currentProject.budgetDisbursed / currentProject.budget) * 100)}%)
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target Completion</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: currentProject.status === 'Delayed' ? '#f87171' : 'var(--text-primary)' }}>
                  {currentProject.revisedDate || currentProject.targetDate}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Original: {currentProject.targetDate}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Contractor SLA Rating</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#60a5fa' }}>
                  {currentProject.contractor.slaComplianceRate}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Historical on-time score</div>
              </div>
            </div>
          </div>

          {/* Milestones Checklist Card */}
          <div className="civic-card">
            <div className="civic-card-header">
              <div className="card-title-group">
                <FileCheck size={20} color="#3b82f6" />
                <div>
                  <h2>Geo-Fenced Milestone Checklist & Evidence</h2>
                  <div className="card-subtitle">Every stage requires timestamped photo proof before municipal funds are unlocked</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {currentProject.milestones.map((m, idx) => {
                const isDone = m.status === 'Completed';
                const isInProgress = m.status === 'In Progress';

                return (
                  <div 
                    key={m.id}
                    style={{
                      background: 'var(--bg-input)',
                      border: isDone ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: isDone ? 'rgba(16,185,129,0.2)' : isInProgress ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                        color: isDone ? '#10b981' : isInProgress ? '#60a5fa' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.85rem'
                      }}>
                        {isDone ? <CheckCircle2 size={18} /> : idx + 1}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{m.title}</span>
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '4px',
                            background: isDone ? 'rgba(16,185,129,0.15)' : isInProgress ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)',
                            color: isDone ? '#34d399' : isInProgress ? '#60a5fa' : 'var(--text-muted)'
                          }}>
                            {m.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Scheduled Target: {m.date}
                        </div>
                      </div>
                    </div>

                    {/* Proof or Action Button */}
                    <div>
                      {m.proofUrl ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                            <img src={m.proofUrl} alt="Milestone proof" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#34d399' }}>
                            ✓ GPS Verified Site Photo
                          </div>
                        </div>
                      ) : (
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => handleOpenSubmitProof(m.id)}
                        >
                          <Upload size={14} /> Submit Geotagged Proof
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* Proof Submission Modal */}
      {showProofModal && (
        <div className="modal-overlay" onClick={() => setShowProofModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Submit Geotagged Milestone Verification</h3>
              <button onClick={() => setShowProofModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmProofSubmission} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                <div><strong>Work Order:</strong> {currentProject.id} — {currentProject.title}</div>
                <div><strong>Contractor:</strong> {currentProject.contractor.name}</div>
              </div>

              <div className="form-group">
                <label className="form-label">Contractor Site Engineer Notes</label>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  value={proofNote}
                  onChange={(e) => setProofNote(e.target.value)}
                  placeholder="Specify compaction tests completed, cube test strength, or trench backfilling specifications..."
                  required
                />
              </div>

              <div style={{ background: 'var(--bg-input)', border: '1px dashed var(--border-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <FileCheck size={28} color="#3b82f6" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Simulated GPS Camera Upload Attached</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Location metadata: {currentProject.coordinates.join(', ')} • Timestamp: Live</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowProofModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Verify & Unlock Milestone Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
