import React, { useState } from 'react';
import { 
  Map, 
  AlertTriangle, 
  Users, 
  Briefcase, 
  BarChart3, 
  ShieldCheck, 
  Bell, 
  CheckCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import GisMap from './components/GisMap';
import ClashDetector from './components/ClashDetector';
import CitizenPortal from './components/CitizenPortal';
import ContractorLedger from './components/ContractorLedger';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import DigitalSignboardModal from './components/DigitalSignboardModal';
import { INITIAL_PROJECTS, INITIAL_CLASHES, INITIAL_GRIEVANCES, DEPARTMENTS } from './data/mockData';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState('gis-map'); // 'gis-map', 'clash-detector', 'citizen-portal', 'contractor-ledger', 'analytics'
  const [userRole, setUserRole] = useState('citizen'); // 'citizen', 'officer', 'commissioner'
  
  // App state
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [clashes, setClashes] = useState(INITIAL_CLASHES);
  const [grievances, setGrievances] = useState(INITIAL_GRIEVANCES);
  
  // Modals & Contextual Triggers
  const [signboardProject, setSignboardProject] = useState(null);
  const [grievancePrefillProject, setGrievancePrefillProject] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Clash resolution handler
  const handleResolveClash = (clashId, resolutionType) => {
    const clash = clashes.find(c => c.id === clashId);
    if (!clash) return;

    if (resolutionType === 'MERGE_JOINT_TRENCHING') {
      // Update projects to joint trenching status
      setProjects(prev => prev.map(p => {
        if (p.id === clash.projectAId || p.id === clash.projectBId) {
          return {
            ...p,
            status: 'In Progress',
            trafficAdvice: 'Joint trenching execution active. Both utilities laying concurrently with single-pass asphalt finish.',
            progress: p.progress + 15
          };
        }
        return p;
      }));

      // Remove from active clashes
      setClashes(prev => prev.filter(c => c.id !== clashId));
      showToast('🎉 Joint Utility Trenching Approved! Saved ₹18.5 Lakhs & 22 days of road blockage.');
      try {
        confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
      } catch (_) {}

    } else if (resolutionType === 'SEQUENCE_ADJUSTMENT') {
      setProjects(prev => prev.map(p => {
        if (p.id === clash.projectAId) {
          return {
            ...p,
            status: 'Planned',
            startDate: '2026-12-16',
            targetDate: '2027-01-10',
            trafficAdvice: 'Rescheduled to occur AFTER Metro Water pipeline completion. Preserving fresh bitumen.'
          };
        }
        if (p.id === clash.projectBId) {
          return {
            ...p,
            status: 'In Progress',
            trafficAdvice: 'Expedited trenching in progress.'
          };
        }
        return p;
      }));

      setClashes(prev => prev.filter(c => c.id !== clashId));
      showToast('✅ Digging Sequence Adjusted: Pipe laid first, road asphalted after.');

    } else if (resolutionType === 'IMPOSE_MORATORIUM') {
      setProjects(prev => prev.filter(p => p.id !== clash.projectBId));
      setClashes(prev => prev.filter(c => c.id !== clashId));
      showToast('🛡️ Digging Moratorium Enforced: Unauthorized trenching permit revoked.');
    }
  };

  // Grievance upvoting
  const handleUpvoteGrievance = (grievanceId) => {
    setGrievances(prev => prev.map(g => {
      if (g.id === grievanceId) {
        const wasUpvoted = g.upvotedByUser;
        const newCount = wasUpvoted ? g.upvotes - 1 : g.upvotes + 1;
        const willBeEscalated = newCount >= 25;
        
        if (!wasUpvoted && willBeEscalated) {
          showToast(`🚨 Grievance ${g.id} crossed 25 upvotes! Escalated to Zonal Commissioner.`);
        }

        return {
          ...g,
          upvotes: newCount,
          upvotedByUser: !wasUpvoted
        };
      }
      return g;
    }));
  };

  // New grievance submission
  const handleSubmitNewGrievance = (newGrv) => {
    setGrievances(prev => [newGrv, ...prev]);
    showToast(`📝 Grievance ${newGrv.id} logged successfully with GPS verification!`);
  };

  // Contractor milestone proof update
  const handleUpdateProjectMilestone = (projectId, milestoneId, data) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedMilestones = p.milestones.map(m => {
          if (m.id === milestoneId) {
            return { ...m, status: data.status, proofUrl: data.proofUrl };
          }
          return m;
        });

        const completedCount = updatedMilestones.filter(m => m.status === 'Completed').length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);

        return {
          ...p,
          milestones: updatedMilestones,
          progress: newProgress,
          budgetDisbursed: p.budgetDisbursed + Math.round(p.budget / updatedMilestones.length)
        };
      }
      return p;
    }));

    showToast('✔️ Milestone proof verified by GPS coordinates. Payout tranche unlocked!');
  };

  const handleOpenGrievanceFromProject = (project) => {
    setGrievancePrefillProject(project);
    setActiveTab('citizen-portal');
  };

  return (
    <div className="app-container">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid #3b82f6',
          color: '#f8fafc',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'modalEnter 0.2s ease-out'
        }}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="header-bar">
        <div className="header-top">
          
          {/* Logo & Platform Name */}
          <div className="brand-section">
            <div className="brand-logo-icon">
              <ShieldCheck size={24} />
            </div>
            <div className="brand-title-wrap">
              <h1>
                CivicSync
                <span className="brand-badge">CivicTech Platform</span>
              </h1>
              <div className="brand-subtitle">
                Municipal Public Works Transparency & Inter-Departmental Coordination Engine
              </div>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="header-controls">
            
            {/* Live Status indicator */}
            <div className="live-pulse-badge">
              <div className="pulse-dot"></div>
              <span>Chennai-Kancheepuram Zonal Grid Active</span>
            </div>

            {/* Persona Switcher */}
            <div className="role-selector-wrap">
              <span className="role-selector-label">Role:</span>
              <select 
                className="role-select"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="citizen">👤 Resident / Citizen</option>
                <option value="officer">👷 Dept Engineer (PWD/Water)</option>
                <option value="commissioner">🏛️ City Commissioner</option>
              </select>
            </div>

          </div>

        </div>

        {/* Tab Navigation */}
        <nav className="nav-tabs-bar">
          
          <button 
            className={`nav-tab-btn ${activeTab === 'gis-map' ? 'active' : ''}`}
            onClick={() => setActiveTab('gis-map')}
          >
            <Map size={16} />
            <span>Live Works & GIS Map</span>
            <span className="tab-badge info">{projects.length}</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'clash-detector' ? 'active' : ''}`}
            onClick={() => setActiveTab('clash-detector')}
          >
            <AlertTriangle size={16} />
            <span>Inter-Department Clash Detector</span>
            {clashes.length > 0 && (
              <span className="tab-badge danger">{clashes.length} Active Conflict</span>
            )}
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'citizen-portal' ? 'active' : ''}`}
            onClick={() => setActiveTab('citizen-portal')}
          >
            <Users size={16} />
            <span>Citizen Transparency & Grievances</span>
            <span className="tab-badge info">{grievances.length}</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'contractor-ledger' ? 'active' : ''}`}
            onClick={() => setActiveTab('contractor-ledger')}
          >
            <Briefcase size={16} />
            <span>Contractor Milestone & Budget Ledger</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={16} />
            <span>Ward Governance & Impact</span>
          </button>

        </nav>
      </header>

      {/* Main Content Area */}
      <main className="main-view-container">
        
        {activeTab === 'gis-map' && (
          <GisMap 
            projects={projects}
            onSelectProject={(p) => {}}
            onOpenSignboard={(p) => setSignboardProject(p)}
            onReportIssueForProject={(p) => handleOpenGrievanceFromProject(p)}
          />
        )}

        {activeTab === 'clash-detector' && (
          <ClashDetector 
            clashes={clashes}
            onResolveClash={handleResolveClash}
          />
        )}

        {activeTab === 'citizen-portal' && (
          <CitizenPortal 
            grievances={grievances}
            projects={projects}
            onUpvoteGrievance={handleUpvoteGrievance}
            onSubmitNewGrievance={handleSubmitNewGrievance}
            prefilledProject={grievancePrefillProject}
          />
        )}

        {activeTab === 'contractor-ledger' && (
          <ContractorLedger 
            projects={projects}
            onUpdateProjectMilestone={handleUpdateProjectMilestone}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard 
            projects={projects}
            grievances={grievances}
          />
        )}

      </main>

      {/* Digital Signboard Modal */}
      {signboardProject && (
        <DigitalSignboardModal 
          project={signboardProject}
          onClose={() => setSignboardProject(null)}
          onReportIssue={(p) => handleOpenGrievanceFromProject(p)}
        />
      )}

      {/* Footer */}
      <footer className="footer-bar">
        <div>
          <strong>CivicSync Platform</strong> — Built for 24-Hour Web Development Hackathon @ IIITDM Kancheepuram
        </div>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <span>Domain: <strong>CivicTech (Public Works Transparency)</strong></span>
          <span>Standards: OpenGIS & Smart Cities Mission Guidelines</span>
        </div>
      </footer>

    </div>
  );
}
