import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Award, 
  BarChart3, 
  Download, 
  PieChart, 
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { WARD_STATISTICS, DEPARTMENTS } from '../data/mockData';

export default function AnalyticsDashboard({ projects, grievances }) {
  const exportAuditReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      platform: 'CivicSync Municipal Public Works Coordination Engine',
      summary: WARD_STATISTICS,
      activeProjectsCount: projects.length,
      unresolvedGrievances: grievances.filter(g => g.status !== 'Resolved').length,
      projects: projects.map(p => ({
        id: p.id,
        title: p.title,
        department: p.department,
        ward: p.ward,
        budget: p.budget,
        disbursed: p.budgetDisbursed,
        status: p.status,
        contractor: p.contractor.name,
        delayPenalty: p.delayPenalty
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CivicSync_Municipal_Works_Audit_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Banner with Action CTA */}
      <div className="civic-card" style={{ background: 'linear-gradient(135deg, rgba(24,34,52,0.9), rgba(13,20,36,0.95))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="brand-badge" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', borderColor: 'rgba(16,185,129,0.3)' }}>
                Zonal Executive Analytics
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>City Commissioner Live Feed</span>
            </div>
            <h2 style={{ fontSize: '1.35rem' }}>Municipal Public Works Performance & Impact</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Quantifying taxpayer capital preservation, road digging prevention rates, and inter-departmental synchronization.
            </p>
          </div>

          <button 
            className="btn btn-primary"
            onClick={exportAuditReport}
            style={{ gap: '0.5rem' }}
          >
            <Download size={16} /> Export Municipal Transparency Audit
          </button>
        </div>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid-cols-4">
        
        <div className="civic-card" style={{ borderTop: '3px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            <span>Taxpayer Funds Saved</span>
            <DollarSign size={16} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399', margin: '0.4rem 0 0.2rem' }}>
            {WARD_STATISTICS.taxpayerMoneySavedViaDeconfliction}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: '#10b981', fontWeight: 700 }}>+24%</span> vs prior uncoordinated fiscal year
          </div>
        </div>

        <div className="civic-card" style={{ borderTop: '3px solid #3b82f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            <span>"Dig-Once" Adherence</span>
            <ShieldCheck size={16} color="#3b82f6" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#60a5fa', margin: '0.4rem 0 0.2rem' }}>
            {WARD_STATISTICS.digOnceComplianceRate}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            14 utility trench clashes proactively averted
          </div>
        </div>

        <div className="civic-card" style={{ borderTop: '3px solid #eab308' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            <span>Avg Citizen SLA Response</span>
            <Clock size={16} color="#eab308" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#facc15', margin: '0.4rem 0 0.2rem' }}>
            {WARD_STATISTICS.averageGrievanceResolutionHours} Hours
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            Down from 14 days baseline turnaround
          </div>
        </div>

        <div className="civic-card" style={{ borderTop: '3px solid #a855f7' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            <span>Total Tracked Outlay</span>
            <BarChart3 size={16} color="#a855f7" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c084fc', margin: '0.4rem 0 0.2rem' }}>
            {WARD_STATISTICS.totalTaxBudgetTracked}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            Across 48 active capital works projects
          </div>
        </div>

      </div>

      {/* Ward Leaderboard + Department Breakdown */}
      <div className="grid-cols-2">
        
        {/* Ward Leaderboard */}
        <div className="civic-card">
          <div className="civic-card-header">
            <div className="card-title-group">
              <Award size={20} color="#f59e0b" />
              <div>
                <h2>Ward Coordination Leaderboard</h2>
                <div className="card-subtitle">Ranking wards by deconfliction efficiency and citizen satisfaction</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {WARD_STATISTICS.wards.map((ward, idx) => {
              return (
                <div 
                  key={ward.name}
                  style={{
                    background: 'var(--bg-input)',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: idx === 0 ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.05)',
                      color: idx === 0 ? '#facc15' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.8rem'
                    }}>
                      #{idx + 1}
                    </div>

                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{ward.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {ward.activeWorks} active works • {ward.onTimePercent}% on-schedule delivery
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: ward.score >= 90 ? '#34d399' : '#60a5fa' }}>
                      {ward.score}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Coordination Score</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Response & Capital Allocation */}
        <div className="civic-card">
          <div className="civic-card-header">
            <div className="card-title-group">
              <Activity size={20} color="#3b82f6" />
              <div>
                <h2>Inter-Department Resource Matrix</h2>
                <div className="card-subtitle">Active works and expenditure across municipal agencies</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {Object.values(DEPARTMENTS).map((dept) => {
              return (
                <div 
                  key={dept.id}
                  style={{
                    background: 'var(--bg-input)',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: dept.color }}></span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{dept.name}</span>
                    </div>

                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>
                      {dept.budgetSpent}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>In-charge: {dept.headOfficer}</span>
                    <span>{dept.activeProjects} Active Works</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
