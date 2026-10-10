import React from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Phone, 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle,
  QrCode,
  Share2,
  Printer
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';

export default function DigitalSignboardModal({ project, onClose, onReportIssue }) {
  if (!project) return null;

  const dept = DEPARTMENTS[project.department] || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '700px',
          background: '#0d1322',
          border: '2px solid #3b82f6',
          boxShadow: '0 0 35px -5px rgba(59,130,246,0.3)',
          padding: '1.75rem'
        }}
      >
        {/* Top Official Municipal Header */}
        <div style={{
          textAlign: 'center',
          borderBottom: '2px dashed var(--border-subtle)',
          paddingBottom: '1rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#93c5fd', fontWeight: 700 }}>
            Government of Tamil Nadu • Greater Metropolitan Corporation
          </div>
          <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: '0.35rem 0' }}>
            MUNICIPAL PUBLIC WORKS DISCLOSURE BOARD
          </h2>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Mandatory Public Information under Citizen Charter & RTI Act, Section 4(1)(b)
          </div>
        </div>

        {/* Work Order Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '1.25rem', alignItems: 'center', background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Work Order Registration ID</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>
              {project.id}
            </div>

            <h3 style={{ fontSize: '1rem', margin: '0.4rem 0 0.2rem', color: '#f8fafc' }}>
              {project.title}
            </h3>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={13} color="#60a5fa" /> {project.roadName} ({project.ward})
            </div>
          </div>

          {/* QR Code representation */}
          <div style={{ background: '#fff', padding: '0.65rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="85" height="85" viewBox="0 0 24 24" fill="#000">
              <path d="M2 2h8v8H2zm2 2v4h4V4zm-2 10h8v8H2zm2 2v4h4v-4zm10-14h8v8h-8zm2 2v4h4V4zm2 10h2v2h-2zm4 0h2v4h-2zm-4 4h4v2h-4zm6-2h2v4h-2zm-2 2h2v2h-2z"/>
            </svg>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#000', marginTop: '2px' }}>
              SCAN TO TRACK
            </span>
          </div>
        </div>

        {/* Detailed Specs Table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
          
          <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Sanctioned Capital Cost</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#10b981' }}>
              ₹{(project.budget / 100000).toFixed(2)} Lakhs
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Disbursed: ₹{(project.budgetDisbursed / 100000).toFixed(2)} Lakhs
            </div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Executing Department</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: dept.color }}>
              {dept.name}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Officer: {dept.headOfficer}
            </div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Contractor Details</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
              {project.contractor.name}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              Site Eng: {project.contractor.leadEngineer} • 📞 {project.contractor.phone}
            </div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Timeline & Deadline</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
              {project.startDate} to {project.revisedDate || project.targetDate}
            </div>
            <div style={{ fontSize: '0.7rem', color: project.delayPenalty > 0 ? '#f87171' : '#34d399' }}>
              {project.delayPenalty > 0 ? `Penalty Active: ₹${project.delayPenalty.toLocaleString()}` : 'Within Mandated SLA'}
            </div>
          </div>

        </div>

        {/* Public Grievance Toll-Free Clause */}
        <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.775rem', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <strong>Citizen Right:</strong> To report missing barricades, safety hazards, or project stalls, 
            dial Municipal Helpline: <strong>1913</strong> or file a geotagged grievance online.
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => window.print()}
          >
            <Printer size={14} /> Print Notice Board
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => {
                onClose();
                if (onReportIssue) onReportIssue(project);
              }}
            >
              <AlertTriangle size={14} /> Report Violation
            </button>
            <button className="btn btn-primary btn-sm" onClick={onClose}>
              Close Board
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
