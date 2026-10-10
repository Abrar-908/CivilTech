import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { 
  AlertTriangle, 
  Layers, 
  MapPin, 
  Clock, 
  Phone, 
  DollarSign, 
  ShieldAlert, 
  QrCode, 
  CheckCircle2, 
  Filter,
  Navigation
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';

// Custom colored SVG pin markers for Leaflet without relying on external PNG assets
const createCustomIcon = (deptId, isClash) => {
  const dept = DEPARTMENTS[deptId] || { color: '#3b82f6' };
  const color = isClash ? '#ec4899' : dept.color;
  
  const svgHtml = `
    <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
      ${isClash ? `<div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: rgba(236, 72, 153, 0.4); animation: pulseAnim 1.5s infinite;"></div>` : ''}
      <svg width="34" height="34" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3" fill="#ffffff"></circle>
      </svg>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 34],
    popupAnchor: [0, -32]
  });
};

export default function GisMap({ projects, onSelectProject, onOpenSignboard, onReportIssueForProject }) {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [mapTheme, setMapTheme] = useState('osm');

  const tileConfigurations = {
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      className: ''
    },
    hot: {
      url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors, Tiles by Humanitarian OpenStreetMap Team',
      className: ''
    },
    esri: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri',
      className: ''
    },
    dark: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors',
      className: 'dark-tiles'
    }
  };
  const activeTile = tileConfigurations[mapTheme] || tileConfigurations.osm;

  // Center coordinate around Kancheepuram / Chennai corridor
  const mapCenter = [12.9250, 80.1700];

  const filteredProjects = projects.filter(p => {
    if (selectedDeptFilter !== 'all' && p.department !== selectedDeptFilter) return false;
    if (selectedStatusFilter !== 'all' && p.status !== selectedStatusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || 
             p.roadName.toLowerCase().includes(q) || 
             p.ward.toLowerCase().includes(q) ||
             p.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Filter Controls */}
      <div className="civic-card" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search bar */}
          <div style={{ flex: '1 1 280px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.4rem 0.8rem' }}>
            <MapPin size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search by Road, Ward (e.g. 178), Project ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '0.85rem' }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
              >✕</button>
            )}
          </div>

          {/* Department Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Filter size={14} /> Dept:
            </span>
            <select 
              className="form-select"
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            >
              <option value="all">All Departments</option>
              <option value="pwd">Highways / PWD Roadways</option>
              <option value="water">Metro Water & Drainage</option>
              <option value="electricity">TNEB Electricity Board</option>
              <option value="drainage">Stormwater Drains (SWD)</option>
              <option value="telecom">Smart City Telecom</option>
            </select>
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status:</span>
            <select 
              className="form-select"
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            >
              <option value="all">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Clash Detected">⚠️ Clash Detected</option>
              <option value="Delayed">Delayed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Map Base Style Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Map Style:</span>
            <select 
              className="form-select"
              value={mapTheme}
              onChange={(e) => setMapTheme(e.target.value)}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            >
              <option value="osm">Standard Street Map (OSM)</option>
              <option value="hot">Humanitarian Detail (HOT)</option>
              <option value="esri">Esri World GIS</option>
              <option value="dark">Night Mode Dark Tiles</option>
            </select>
          </div>

          {/* Result Count Indicator */}
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-primary)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            Showing <strong>{filteredProjects.length}</strong> of {projects.length} Works
          </div>
        </div>
      </div>

      {/* Main Map + Selected Work Info Panel Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedProject ? '1fr 380px' : '1fr', gap: '1.25rem', height: '620px', transition: 'grid-template-columns 0.3s ease' }}>
        
        {/* Interactive GIS Map Container */}
        <div className="civic-card" style={{ padding: '0.5rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          
          {/* Map legend overlay */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '20px',
            zIndex: 999,
            background: 'rgba(17, 24, 39, 0.92)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.65rem 0.9rem',
            fontSize: '0.75rem',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem'
          }}>
            <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Layers size={13} color="#60a5fa" /> GIS Agency Legend
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }}></span>
              <span>PWD Roadways / Asphalt</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#06b6d4', display: 'inline-block' }}></span>
              <span>Metro Water & Sewerage</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308', display: 'inline-block' }}></span>
              <span>TNEB Power Cables</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              <span>Stormwater Drains</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ec4899', display: 'inline-block' }}></span>
              <span style={{ color: '#f472b6', fontWeight: 600 }}>⚠️ Conflict / Clash Zone</span>
            </div>
          </div>

          <MapContainer 
            center={mapCenter} 
            zoom={12} 
            scrollWheelZoom={true} 
            style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }}
          >
            {/* Dynamic Map Tiles (100% Free, No API Key Required) */}
            <TileLayer
              key={mapTheme}
              attribution={activeTile.attribution}
              url={activeTile.url}
              className={activeTile.className}
              maxZoom={19}
            />

            {/* Render Public Work Markers */}
            {filteredProjects.map((p) => {
              const isClash = p.status === 'Clash Detected';
              const dept = DEPARTMENTS[p.department] || {};

              return (
                <React.Fragment key={p.id}>
                  {/* Warning radius circle around Clash zones */}
                  {isClash && (
                    <Circle
                      center={p.coordinates}
                      radius={350}
                      pathOptions={{
                        color: '#ec4899',
                        fillColor: '#ec4899',
                        fillOpacity: 0.18,
                        weight: 2,
                        dashArray: '4, 4'
                      }}
                    />
                  )}

                  {/* Active excavation buffer */}
                  {p.status === 'In Progress' && (
                    <Circle
                      center={p.coordinates}
                      radius={220}
                      pathOptions={{
                        color: dept.color || '#3b82f6',
                        fillColor: dept.color || '#3b82f6',
                        fillOpacity: 0.12,
                        weight: 1
                      }}
                    />
                  )}

                  <Marker
                    position={p.coordinates}
                    icon={createCustomIcon(p.department, isClash)}
                    eventHandlers={{
                      click: () => {
                        setSelectedProject(p);
                        if (onSelectProject) onSelectProject(p);
                      }
                    }}
                  >
                    <Popup>
                      <div style={{ minWidth: '220px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: '700', color: dept.color }}>
                            {dept.shortName} • {p.id}
                          </span>
                          <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: '4px', background: isClash ? 'rgba(236,72,153,0.2)' : 'rgba(59,130,246,0.2)', color: isClash ? '#ec4899' : '#3b82f6', fontWeight: 'bold' }}>
                            {p.status}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '700', margin: '4px 0 6px', color: '#f8fafc' }}>
                          {p.title}
                        </h4>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px' }}>
                          📍 {p.roadName} ({p.ward})
                        </div>
                        <div style={{ background: '#0b0f19', padding: '6px 8px', borderRadius: '6px', fontSize: '0.72rem', marginBottom: '8px' }}>
                          <div><strong>Progress:</strong> {p.progress}%</div>
                          <div><strong>Target Completion:</strong> {p.targetDate}</div>
                        </div>
                        <button 
                          className="btn btn-primary btn-sm"
                          style={{ width: '100%', fontSize: '0.72rem', padding: '4px 8px' }}
                          onClick={() => setSelectedProject(p)}
                        >
                          View Full Project Dossier →
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>

        {/* Selected Project Dossier Drawer */}
        {selectedProject && (
          <div className="civic-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <span className={`dept-pill ${selectedProject.department}`}>
                  {DEPARTMENTS[selectedProject.department]?.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                  {selectedProject.id}
                </span>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem', padding: '0.2rem' }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ fontSize: '1.05rem', lineHeight: '1.3' }}>
              {selectedProject.title}
            </h3>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={14} color="#60a5fa" />
              <span>{selectedProject.roadName} — <strong>{selectedProject.ward}</strong></span>
            </div>

            {/* Status & Clash Banner if applicable */}
            {selectedProject.status === 'Clash Detected' && (
              <div style={{
                background: 'rgba(236, 72, 153, 0.12)',
                border: '1px solid rgba(236, 72, 153, 0.35)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                fontSize: '0.775rem',
                color: '#f472b6',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                  <AlertTriangle size={15} /> Departmental Digging Conflict
                </div>
                <div>Overlaps with another utility permit within 10 days. Tap below to inspect deconfliction plan.</div>
              </div>
            )}

            {/* Progress Meter */}
            <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Physical Progress</span>
                <span style={{ fontWeight: 700, color: '#60a5fa' }}>{selectedProject.progress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${selectedProject.progress}%`, 
                    height: '100%', 
                    background: selectedProject.status === 'Delayed' ? '#ef4444' : 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                    borderRadius: '4px' 
                  }} 
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                <span>Started: {selectedProject.startDate}</span>
                <span>Deadline: {selectedProject.revisedDate || selectedProject.targetDate}</span>
              </div>
            </div>

            {/* Financial & Authority Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
              <div style={{ background: 'var(--bg-input)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <DollarSign size={13} color="#10b981" /> Sanctioned Budget
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '2px' }}>
                  ₹{(selectedProject.budget / 100000).toFixed(1)} Lakhs
                </div>
              </div>

              <div style={{ background: 'var(--bg-input)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ShieldAlert size={13} color="#f59e0b" /> Disruption Level
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '2px', color: selectedProject.disruptionLevel === 'High' ? '#f87171' : '#34d399' }}>
                  {selectedProject.disruptionLevel}
                </div>
              </div>
            </div>

            {/* Traffic Advice */}
            <div style={{ background: 'var(--bg-input)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '3px' }}>
                <Navigation size={13} color="#38bdf8" /> Citizen Traffic Advice
              </div>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {selectedProject.trafficAdvice}
              </div>
              {selectedProject.hasDetour && (
                <div style={{ marginTop: '4px', color: '#fbbf24', fontSize: '0.72rem' }}>
                  ⚠️ Detour: {selectedProject.detourDescription}
                </div>
              )}
            </div>

            {/* Contractor Contact */}
            <div style={{ background: 'var(--bg-input)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}>
              <div style={{ color: 'var(--text-muted)' }}>Assigned Contractor:</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedProject.contractor.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px', color: 'var(--text-secondary)' }}>
                <Phone size={12} color="#34d399" /> {selectedProject.contractor.phone} ({selectedProject.contractor.leadEngineer})
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => onOpenSignboard && onOpenSignboard(selectedProject)}
                style={{ width: '100%' }}
              >
                <QrCode size={14} /> View Municipal Digital Signboard (QR)
              </button>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => onReportIssueForProject && onReportIssueForProject(selectedProject)}
                style={{ width: '100%' }}
              >
                <AlertTriangle size={14} /> Report Hazard / Complaint on this Work
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
