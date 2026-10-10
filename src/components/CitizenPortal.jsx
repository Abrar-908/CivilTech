import React, { useState } from 'react';
import { 
  AlertCircle, 
  ThumbsUp, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Camera, 
  Upload, 
  PlusCircle, 
  Filter, 
  ShieldCheck,
  User,
  Phone,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CitizenPortal({ 
  grievances, 
  projects, 
  onUpvoteGrievance, 
  onSubmitNewGrievance,
  prefilledProject
}) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterWard, setFilterWard] = useState('all');

  // New Grievance Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Safety Hazard');
  const [severity, setSeverity] = useState('High');
  const [ward, setWard] = useState(prefilledProject ? prefilledProject.ward : 'Ward 178');
  const [address, setAddress] = useState(prefilledProject ? prefilledProject.roadName : '');
  const [relatedProjectId, setRelatedProjectId] = useState(prefilledProject ? prefilledProject.id : 'CW-102');
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(
    'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const newGrievance = {
      id: `GRV-${Math.floor(100 + Math.random() * 900)}`,
      projectId: relatedProjectId,
      title,
      category,
      severity,
      ward,
      address,
      submittedBy: citizenName || 'Concerned Resident',
      phone: citizenPhone || '+91 98400 *****',
      dateReported: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Submitted',
      assignedOfficer: 'Dispatching Ward Safety Officer',
      upvotes: 1,
      upvotedByUser: true,
      description,
      photoUrl: selectedPhoto,
      resolutionNote: 'Registered in municipal citizen grievance ledger. Mandated initial inspection within 24 hours under Citizen Charter.'
    };

    onSubmitNewGrievance(newGrievance);
    setShowReportModal(false);
    setTitle('');
    setDescription('');
    
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch (_) {}
  };

  const filteredGrievances = grievances.filter(g => {
    if (filterCategory !== 'all' && g.category !== filterCategory) return false;
    if (filterWard !== 'all' && g.ward !== filterWard) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Banner with Action CTA */}
      <div className="civic-card" style={{ background: 'linear-gradient(135deg, rgba(24,34,52,0.9), rgba(13,20,36,0.95))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="brand-badge">Citizen Charter & Right to Information</span>
              <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>• Guaranteed 48-Hour SLA</span>
            </div>
            <h2 style={{ fontSize: '1.35rem' }}>Public Works Transparency & Citizen Grievances</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem', maxWidth: '750px' }}>
              See unbarricaded pits, broken water pipes, or stalled roadwork in your neighborhood? 
              Report directly with geotagged evidence. Upvote issues in your ward to escalate municipal enforcement priority.
            </p>
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => setShowReportModal(true)}
            style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
          >
            <PlusCircle size={18} /> Report Work Hazard / Delay
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="civic-card" style={{ padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter size={14} color="var(--text-secondary)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category:</span>
              <select 
                className="form-select" 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
              >
                <option value="all">All Categories</option>
                <option value="Safety Hazard">Safety Hazard</option>
                <option value="Pedestrian Obstruction">Pedestrian Obstruction</option>
                <option value="Utility Damage">Utility Damage</option>
                <option value="Stalled Construction">Stalled Construction</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ward:</span>
              <select 
                className="form-select" 
                value={filterWard} 
                onChange={(e) => setFilterWard(e.target.value)}
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
              >
                <option value="all">All Wards</option>
                <option value="Ward 156">Ward 156 (Kancheepuram)</option>
                <option value="Ward 174">Ward 174 (Chromepet GST)</option>
                <option value="Ward 178">Ward 178 (Velachery)</option>
                <option value="Ward 182">Ward 182 (Medavakkam)</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredGrievances.length}</strong> Community Reports
          </div>
        </div>
      </div>

      {/* Grievance Feed List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredGrievances.map((grv) => {
          const isHighPriority = grv.upvotes >= 25;
          const statusColors = {
            'Submitted': '#60a5fa',
            'Inspected': '#f59e0b',
            'In Progress': '#38bdf8',
            'Resolved': '#10b981'
          };

          return (
            <div 
              key={grv.id} 
              className="civic-card"
              style={{
                display: 'grid',
                gridTemplateColumns: grv.photoUrl ? '1fr 180px' : '1fr',
                gap: '1.25rem',
                borderLeft: isHighPriority ? '4px solid #ef4444' : '4px solid #3b82f6'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', fontWeight: 600 }}>
                      {grv.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {grv.id}
                    </span>
                    {isHighPriority && (
                      <span style={{ fontSize: '0.7rem', color: '#f87171', background: 'rgba(239,68,68,0.15)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        🔥 High Community Priority (Escalated)
                      </span>
                    )}
                  </div>

                  {/* Status Badge */}
                  <span style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    color: statusColors[grv.status] || '#60a5fa',
                    background: `${statusColors[grv.status] || '#60a5fa'}20`,
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    ● {grv.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', margin: '0.25rem 0 0.4rem' }}>
                  {grv.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.75rem' }}>
                  {grv.description}
                </p>

                {/* Location and Reporter meta */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={13} color="#60a5fa" /> {grv.address} ({grv.ward})
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <User size={13} /> Reported by {grv.submittedBy}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={13} /> {grv.dateReported}
                  </span>
                </div>

                {/* Authority Resolution / Inspection Box */}
                {grv.resolutionNote && (
                  <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem', fontSize: '0.78rem', marginBottom: '0.85rem' }}>
                    <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <ShieldCheck size={14} /> Official Municipal Response ({grv.assignedOfficer}):
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      {grv.resolutionNote}
                    </div>
                  </div>
                )}

                {/* Citizen Upvote Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button 
                    className={`btn btn-sm ${grv.upvotedByUser ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => onUpvoteGrievance(grv.id)}
                    style={{ gap: '0.4rem' }}
                  >
                    <ThumbsUp size={14} /> 
                    <span>{grv.upvotedByUser ? 'Upvoted' : 'Upvote Issue'} ({grv.upvotes})</span>
                  </button>

                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    {grv.upvotes >= 25 ? 'Notified to Zonal Commissioner' : `${25 - grv.upvotes} more upvotes to escalate SLA`}
                  </span>
                </div>

              </div>

              {/* Photo thumbnail */}
              {grv.photoUrl && (
                <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '140px', background: '#000', border: '1px solid var(--border-subtle)' }}>
                  <img 
                    src={grv.photoUrl} 
                    alt="Geotagged site evidence"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', background: 'rgba(0,0,0,0.7)', padding: '2px 4px', textAlign: 'center' }}>
                    📍 Geotagged Site Photo
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* New Grievance Submission Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={20} color="#f87171" />
                <h3 style={{ fontSize: '1.2rem' }}>Report Public Work Hazard / Stalled Site</h3>
              </div>
              <button 
                onClick={() => setShowReportModal(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              <div className="form-group">
                <label className="form-label">Issue Headline *</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. Uncovered 6ft drainage ditch with no barricades near school"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Safety Hazard">Safety Hazard (Pit/Barricade)</option>
                    <option value="Pedestrian Obstruction">Footpath / Road Blocked</option>
                    <option value="Utility Damage">Broken Pipe / Cable Damage</option>
                    <option value="Stalled Construction">Abandoned / Stalled Work</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Severity Level</label>
                  <select className="form-select" value={severity} onChange={(e) => setSeverity(e.target.value)}>
                    <option value="Critical">Critical (Immediate Accident Risk)</option>
                    <option value="High">High (Major Inconvenience)</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Ward / Zone</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={ward} 
                    onChange={(e) => setWard(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Exact Location / Street Landmark *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Opposite IIITDM Gate 2"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description of Hazard *</label>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what is broken, missing barricades, or traffic bottleneck..."
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Name (Resident)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={citizenName} 
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder="e.g. K. Sundaram"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number (For SMS updates)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={citizenPhone} 
                    onChange={(e) => setCitizenPhone(e.target.value)}
                    placeholder="+91 98400 12345"
                  />
                </div>
              </div>

              {/* Simulated Geotagged Camera Photo Proof */}
              <div style={{ background: 'var(--bg-input)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#000' }}>
                    <img src={selectedPhoto} alt="Site preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>GPS Geo-Stamped Photo Attached</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lat: 12.8395° N, Lng: 80.0445° E (Accuracy ±2m)</div>
                  </div>
                </div>

                <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CheckCircle size={14} /> Ready
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowReportModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Geotagged Grievance
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
