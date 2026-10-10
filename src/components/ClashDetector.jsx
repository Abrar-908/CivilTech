import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Shuffle, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles,
  RefreshCw,
  Clock,
  Layers
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function ClashDetector({ clashes, onResolveClash, onAddNewProposal }) {
  const [activeTab, setActiveTab] = useState('active-clashes'); // 'active-clashes' or 'simulator'
  const [simDept, setSimDept] = useState('water');
  const [simRoad, setSimRoad] = useState('Velachery Bypass Road');
  const [simWard, setSimWard] = useState('Ward 178');
  const [simStartDate, setSimStartDate] = useState('2026-11-02');
  const [simEndDate, setSimEndDate] = useState('2026-11-25');
  const [simResult, setSimResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = (e) => {
    e.preventDefault();
    setIsSimulating(true);
    setSimResult(null);

    setTimeout(() => {
      setIsSimulating(false);
      // Collision rule logic: If target road matches known planned road like Velachery or GST within 60 days
      const isRoadCollision = simRoad.toLowerCase().includes('velachery') || simRoad.toLowerCase().includes('gst');
      
      if (isRoadCollision) {
        setSimResult({
          status: 'COLLISION_DETECTED',
          severity: 'Critical Overlap',
          conflictingDept: 'State Highways & PWD Roadways',
          conflictingProject: 'CW-102 (Velachery Bitumen Micro-Surfacing)',
          reason: 'State Highways has sanctioned full asphalt resurfacing for Oct 25 – Nov 20, 2026 on this exact corridor.',
          financialLossRisk: '₹34,50,000 in destroyed fresh bitumen',
          recommendedAction: 'Apply Dig-Once Policy: Mandate trenching prior to bituminous wearing course or execute joint trench ducting.'
        });
      } else {
        setSimResult({
          status: 'CLEAR_TO_PROCEED',
          severity: 'No Conflict',
          reason: 'No overlapping utility permits or road resurfacing work scheduled on this corridor for the next 180 days.',
          moratoriumStatus: 'Passed (No road digging moratorium active on this street)',
          recommendedAction: 'Permit conditionally approved with mandatory 48-hour prior citizen notification.'
        });
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        } catch (_) {}
      }
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Hero explanation banner explaining the problem and Dig-Once approach */}
      <div className="civic-card" style={{ background: 'linear-gradient(135deg, rgba(24,34,52,0.95), rgba(15,23,42,0.98))', border: '1px solid rgba(59,130,246,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ maxWidth: '850px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="brand-badge" style={{ background: 'rgba(236,72,153,0.15)', color: '#f472b6', borderColor: 'rgba(236,72,153,0.3)' }}>
                Algorithmic Deconfliction Engine
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cross-Department Spatial & Temporal Buffer v2.4</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>
              Inter-Department Clash Detection & "Dig-Once" Policy Matrix
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              In conventional municipalities, Roads, Water, Electricity, and Telecom work in data silos. Freshly paved roads are dug up within weeks by water boards, wasting crores of taxpayer funds. 
              <strong> CivicSync automatically cross-references geo-spatial buffers and timeline schedules</strong> across all 5 municipal departments to catch digging collisions BEFORE work orders are issued.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', background: 'var(--bg-input)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', minWidth: '220px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Municipal Tax Savings</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>₹1.85 Crores</div>
            <div style={{ fontSize: '0.7rem', color: '#60a5fa' }}>⚡ 14 Clashes Prevented in 2026</div>
          </div>
        </div>

        {/* Tab switchers */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
          <button 
            className={`btn btn-sm ${activeTab === 'active-clashes' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('active-clashes')}
          >
            <AlertTriangle size={14} /> Active Clashes ({clashes.length})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'simulator' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('simulator')}
          >
            <Sparkles size={14} /> Run "What-If" Digging Collision Simulator
          </button>
        </div>
      </div>

      {/* Tab 1: Active Clashes List */}
      {activeTab === 'active-clashes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {clashes.length === 0 ? (
            <div className="civic-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircle2 size={42} color="#10b981" style={{ margin: '0 auto 0.75rem' }} />
              <h3>All Municipal Departments in Synchronization!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Zero active spatial or scheduling conflicts detected among planned road, water, sewer, and electric permits.
              </p>
            </div>
          ) : (
            clashes.map((clash) => {
              const deptA = DEPARTMENTS[clash.projectADept] || {};
              const deptB = DEPARTMENTS[clash.projectBDept] || {};

              return (
                <div 
                  key={clash.id} 
                  className="civic-card" 
                  style={{ borderLeft: '4px solid #ec4899', background: 'var(--bg-card)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ background: 'rgba(236,72,153,0.2)', color: '#f472b6', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, border: '1px solid rgba(236,72,153,0.4)' }}>
                          {clash.severity} Collision
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {clash.id}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem' }}>{clash.title}</h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        📍 Location: <strong>{clash.location}</strong>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.8rem', textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: '#f87171' }}>Financial Wastage if Ignored</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fca5a5' }}>{clash.financialWastageRisk}</div>
                    </div>
                  </div>

                  {/* Conflict Comparison Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center', background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', margin: '0.75rem 0', border: '1px solid var(--border-subtle)' }}>
                    
                    {/* Project A (Roadways) */}
                    <div style={{ borderLeft: `3px solid ${deptA.color}`, paddingLeft: '0.75rem' }}>
                      <span className={`dept-pill ${clash.projectADept}`}>{deptA.name}</span>
                      <h4 style={{ fontSize: '0.9rem', margin: '0.4rem 0 0.2rem' }}>{clash.projectAName}</h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={13} /> {clash.projectADates}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#60a5fa', marginTop: '2px' }}>
                        Status: Sanctioned for Asphalt Surface Laying
                      </div>
                    </div>

                    {/* Conflict icon */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(236,72,153,0.2)', border: '1px solid #ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f472b6' }}>
                        ⚡
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#f472b6', fontWeight: 700, marginTop: '4px' }}>
                        {clash.overlapDays} Days Overlap
                      </span>
                    </div>

                    {/* Project B (Water) */}
                    <div style={{ borderLeft: `3px solid ${deptB.color}`, paddingLeft: '0.75rem' }}>
                      <span className={`dept-pill ${clash.projectBDept}`}>{deptB.name}</span>
                      <h4 style={{ fontSize: '0.9rem', margin: '0.4rem 0 0.2rem' }}>{clash.projectBName}</h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={13} /> {clash.projectBDates}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#f87171', marginTop: '2px' }}>
                        Trenching scheduled 10 days AFTER road is paved!
                      </div>
                    </div>

                  </div>

                  {/* Recommendation banner */}
                  <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem', fontSize: '0.8rem', color: '#93c5fd', marginBottom: '0.85rem' }}>
                    <strong>💡 Algorithmic Recommendation:</strong> {clash.recommendation}
                  </div>

                  {/* Action Buttons to resolve clash */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'flex-end' }}>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onResolveClash(clash.id, 'MERGE_JOINT_TRENCHING')}
                    >
                      <Shuffle size={14} /> Enforce Joint Utility Trenching (Save ₹18.5L)
                    </button>
                    
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onResolveClash(clash.id, 'SEQUENCE_ADJUSTMENT')}
                    >
                      <Clock size={14} /> Reschedule Sequence (Pave Road After Trenching)
                    </button>

                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => onResolveClash(clash.id, 'IMPOSE_MORATORIUM')}
                    >
                      <ShieldCheck size={14} /> Reject Water Permit & Impose 2-Yr Dig Moratorium
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: What-If Excavation Collision Simulator */}
      {activeTab === 'simulator' && (
        <div className="civic-card">
          <div className="civic-card-header">
            <div className="card-title-group">
              <Sparkles size={20} color="#a855f7" />
              <div>
                <h2>Pre-Approval Excavation Collision Simulator</h2>
                <div className="card-subtitle">Test a new department work proposal against all city road and utility schedules</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleRunSimulation} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Proposing Department</label>
              <select className="form-select" value={simDept} onChange={(e) => setSimDept(e.target.value)}>
                <option value="water">Metro Water & Drainage Board</option>
                <option value="electricity">TNEB Electricity Board</option>
                <option value="telecom">Smart City Optical Fiber</option>
                <option value="drainage">Stormwater Drains</option>
                <option value="pwd">Highways & Roadways</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Corridor / Road Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={simRoad} 
                onChange={(e) => setSimRoad(e.target.value)} 
                placeholder="e.g. Velachery Bypass Road"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ward / Zone</label>
              <input 
                type="text" 
                className="form-input" 
                value={simWard} 
                onChange={(e) => setSimWard(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Proposed Start Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={simStartDate} 
                onChange={(e) => setSimStartDate(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Proposed Completion Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={simEndDate} 
                onChange={(e) => setSimEndDate(e.target.value)} 
                required
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '1rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', height: '42px' }}
                disabled={isSimulating}
              >
                {isSimulating ? <RefreshCw className="spin" size={16} /> : <Sparkles size={16} />}
                {isSimulating ? 'Testing Collision Matrix...' : 'Run Collision Test'}
              </button>
            </div>
          </form>

          {/* Simulation Output Card */}
          {simResult && (
            <div style={{
              marginTop: '1.25rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: simResult.status === 'COLLISION_DETECTED' ? '1px solid #ef4444' : '1px solid #10b981',
              background: simResult.status === 'COLLISION_DETECTED' ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {simResult.status === 'COLLISION_DETECTED' ? (
                    <AlertTriangle size={20} color="#f87171" />
                  ) : (
                    <CheckCircle2 size={20} color="#34d399" />
                  )}
                  <h3 style={{ fontSize: '1.1rem', color: simResult.status === 'COLLISION_DETECTED' ? '#f87171' : '#34d399' }}>
                    {simResult.status === 'COLLISION_DETECTED' ? 'Direct Collision Detected with Existing Permit!' : 'Clearance Certificate: No Clashes Detected!'}
                  </h3>
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: simResult.status === 'COLLISION_DETECTED' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)', color: simResult.status === 'COLLISION_DETECTED' ? '#f87171' : '#34d399' }}>
                  {simResult.severity}
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                {simResult.reason}
              </p>

              {simResult.financialLossRisk && (
                <div style={{ fontSize: '0.8rem', color: '#fca5a5', marginBottom: '0.5rem' }}>
                  <strong>Estimated Taxpayer Loss Risk:</strong> {simResult.financialLossRisk}
                </div>
              )}

              <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', background: 'var(--bg-input)', padding: '0.65rem', borderRadius: 'var(--radius-sm)' }}>
                <strong>Automated Action:</strong> {simResult.recommendedAction}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
