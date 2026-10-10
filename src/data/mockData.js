// Mock Civic Database for CivicSync

export const DEPARTMENTS = {
  pwd: {
    id: 'pwd',
    name: 'State Highways & PWD Roadways',
    shortName: 'Roads / PWD',
    color: '#3b82f6',
    headOfficer: 'Er. R. Sundaralingam, Chief Engineer',
    emergencyHotline: '1800-425-7931',
    activeProjects: 14,
    budgetSpent: '₹14.8 Cr'
  },
  water: {
    id: 'water',
    name: 'Metro Water Supply & Sewerage Board',
    shortName: 'Metro Water',
    color: '#06b6d4',
    headOfficer: 'Dr. M. Kousalya, Superintending Engineer',
    emergencyHotline: '044-4567-8900',
    activeProjects: 11,
    budgetSpent: '₹9.2 Cr'
  },
  electricity: {
    id: 'electricity',
    name: 'State Electricity Distribution Corp (TNEB)',
    shortName: 'TNEB Power',
    color: '#eab308',
    headOfficer: 'Er. S. Balamurugan, Executive Engineer',
    emergencyHotline: '1912',
    activeProjects: 8,
    budgetSpent: '₹6.5 Cr'
  },
  drainage: {
    id: 'drainage',
    name: 'Stormwater Drains & Flood Mitigation',
    shortName: 'SWD Drains',
    color: '#10b981',
    headOfficer: 'Er. Anitha Varma, Director of Drainage',
    emergencyHotline: '1913',
    activeProjects: 9,
    budgetSpent: '₹12.1 Cr'
  },
  telecom: {
    id: 'telecom',
    name: 'Smart City Optical Fiber & Infra',
    shortName: 'Smart Telecom',
    color: '#a855f7',
    headOfficer: 'K. Vignesh, Technical Advisor',
    emergencyHotline: '044-2538-4100',
    activeProjects: 6,
    budgetSpent: '₹4.3 Cr'
  }
};

export const INITIAL_PROJECTS = [
  {
    id: 'CW-101',
    title: 'GST Road Stormwater Drain Widening & Desilting',
    department: 'drainage',
    ward: 'Ward 174',
    roadName: 'Grand Southern Trunk (GST) Road, Chromepet Reach',
    coordinates: [12.9520, 80.1410],
    lengthKm: 1.8,
    budget: 12000000,
    budgetDisbursed: 7800000,
    startDate: '2026-08-15',
    targetDate: '2026-11-10',
    status: 'In Progress',
    progress: 68,
    disruptionLevel: 'Moderate',
    trafficAdvice: 'Single lane cordoned off for 400m between 10 PM and 5 AM. Daytime traffic normal.',
    hasDetour: false,
    contractor: {
      name: 'Shree InfraTech Pvt Ltd',
      leadEngineer: 'A. Praveen',
      phone: '+91 98401 22345',
      licenseId: 'TN-PWD-CL1-4409',
      slaComplianceRate: 94
    },
    milestones: [
      { id: 1, title: 'Survey & Pre-cast Culvert Delivery', status: 'Completed', proofUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80', date: '2026-08-30' },
      { id: 2, title: 'Trench Excavation & Silt Evacuation', status: 'Completed', proofUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80', date: '2026-09-20' },
      { id: 3, title: 'Reinforced Concrete Wall Casting', status: 'In Progress', proofUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80', date: '2026-10-18' },
      { id: 4, title: 'Top Slab Covering & Surface Restoration', status: 'Pending', proofUrl: null, date: '2026-11-10' }
    ],
    delayPenalty: 0,
    citizenComplaintsCount: 3
  },
  {
    id: 'CW-102',
    title: 'Velachery Bypass Bitumen Micro-Surfacing & Re-Carpeting',
    department: 'pwd',
    ward: 'Ward 178',
    roadName: 'Velachery Bypass Road (Vijayanagar Junc to Dhandeeswaram)',
    coordinates: [12.9770, 80.2190],
    lengthKm: 2.4,
    budget: 8500000,
    budgetDisbursed: 1700000,
    startDate: '2026-10-25',
    targetDate: '2026-11-20',
    status: 'Clash Detected',
    progress: 10,
    disruptionLevel: 'High',
    trafficAdvice: 'Heavy vehicles redirected via 100-Ft Taramani Link Road.',
    hasDetour: true,
    detourDescription: 'Diversion via Taramani Link Road & SRP Tools bypass.',
    contractor: {
      name: 'Apex Roadways Infrastructure',
      leadEngineer: 'M. Senthil',
      phone: '+91 94440 98120',
      licenseId: 'TN-HIGHWAY-A-1102',
      slaComplianceRate: 88
    },
    milestones: [
      { id: 1, title: 'Milling of old asphalt surface', status: 'Pending', proofUrl: null, date: '2026-10-28' },
      { id: 2, title: 'Dense Bituminous Macadam (DBM) Layer', status: 'Pending', proofUrl: null, date: '2026-11-08' },
      { id: 3, title: 'Wearing Coat & Thermoplastic Striping', status: 'Pending', proofUrl: null, date: '2026-11-20' }
    ],
    delayPenalty: 0,
    citizenComplaintsCount: 0,
    clashWithProjectId: 'CW-103'
  },
  {
    id: 'CW-103',
    title: 'Velachery 450mm Treated Water Feeder Pipeline Trenching',
    department: 'water',
    ward: 'Ward 178',
    roadName: 'Velachery Bypass Road (Same corridor as CW-102)',
    coordinates: [12.9785, 80.2205],
    lengthKm: 2.1,
    budget: 4200000,
    budgetDisbursed: 840000,
    startDate: '2026-11-05',
    targetDate: '2026-12-15',
    status: 'Clash Detected',
    progress: 5,
    disruptionLevel: 'Critical',
    trafficAdvice: 'Deep trenching on north carriageway. High risk of traffic deadlock.',
    hasDetour: true,
    detourDescription: 'Traffic marshals deployed; one lane alternating traffic.',
    contractor: {
      name: 'Coromandel Pipeworks Ltd',
      leadEngineer: 'V. Jayaraman',
      phone: '+91 97910 55432',
      licenseId: 'CMWSSB-CAT-B-89',
      slaComplianceRate: 81
    },
    milestones: [
      { id: 1, title: 'Utility scanning & trial pits', status: 'Pending', proofUrl: null, date: '2026-11-08' },
      { id: 2, title: 'DI K9 Pipe trenching & jointing', status: 'Pending', proofUrl: null, date: '2026-11-28' },
      { id: 3, title: 'Hydrostatic pressure testing', status: 'Pending', proofUrl: null, date: '2026-12-08' }
    ],
    delayPenalty: 0,
    citizenComplaintsCount: 1,
    clashWithProjectId: 'CW-102'
  },
  {
    id: 'CW-104',
    title: 'Medavakkam Flyover Grade Separator Concrete Curing & Slip Road',
    department: 'pwd',
    ward: 'Ward 182',
    roadName: 'Medavakkam - Mambakkam Main Road Junction',
    coordinates: [12.9190, 80.1910],
    lengthKm: 0.9,
    budget: 34000000,
    budgetDisbursed: 28900000,
    startDate: '2026-06-01',
    targetDate: '2026-10-28',
    status: 'In Progress',
    progress: 88,
    disruptionLevel: 'Low',
    trafficAdvice: 'Main flyover open to light motors; slip road asphalt sealing in progress.',
    hasDetour: false,
    contractor: {
      name: 'L&W Construction Pvt Ltd',
      leadEngineer: 'C. Karthik',
      phone: '+91 98842 11990',
      licenseId: 'TN-PWD-SUPER-001',
      slaComplianceRate: 96
    },
    milestones: [
      { id: 1, title: 'Pillar Pier Curing & Deck Slabs', status: 'Completed', proofUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80', date: '2026-08-15' },
      { id: 2, title: 'Crash Barrier Installation', status: 'Completed', proofUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80', date: '2026-09-28' },
      { id: 3, title: 'Slip Road Bitumen Laying', status: 'In Progress', proofUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80', date: '2026-10-25' }
    ],
    delayPenalty: 0,
    citizenComplaintsCount: 2
  },
  {
    id: 'CW-105',
    title: 'Kancheepuram High Road 33kV Underground Cable Trenching',
    department: 'electricity',
    ward: 'Ward 156',
    roadName: 'Kancheepuram High Road near IIITDM Campus Access',
    coordinates: [12.8390, 80.0440],
    lengthKm: 3.2,
    budget: 18000000,
    budgetDisbursed: 7200000,
    startDate: '2026-07-10',
    targetDate: '2026-09-30',
    revisedDate: '2026-11-15',
    status: 'Delayed',
    progress: 52,
    disruptionLevel: 'High',
    trafficAdvice: 'Open trenches barricaded with hazard tape. Single-lane bottleneck near campus entrance.',
    hasDetour: true,
    detourDescription: 'Heavy buses diverted through outer ring collector lane.',
    contractor: {
      name: 'Vidyut Energy Systems',
      leadEngineer: 'N. Raghavan',
      phone: '+91 93810 66782',
      licenseId: 'TNEB-GRID-C-551',
      slaComplianceRate: 64
    },
    milestones: [
      { id: 1, title: 'Horizontal Directional Drilling (HDD)', status: 'Completed', proofUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80', date: '2026-08-10' },
      { id: 2, title: 'Cable Pulling & Splice Bay Assembly', status: 'In Progress', proofUrl: null, date: '2026-10-20' },
      { id: 3, title: 'Trench Backfill & Compaction', status: 'Pending', proofUrl: null, date: '2026-11-05' }
    ],
    delayPenalty: 145000,
    citizenComplaintsCount: 9
  },
  {
    id: 'CW-106',
    title: 'OMR Sholinganallur Smart City High-Speed Telecom Duct Laying',
    department: 'telecom',
    ward: 'Ward 191',
    roadName: 'Old Mahabalipuram Road (OMR), IT Expressway corridor',
    coordinates: [12.9010, 80.2280],
    lengthKm: 4.5,
    budget: 6200000,
    budgetDisbursed: 4900000,
    startDate: '2026-09-01',
    targetDate: '2026-10-31',
    status: 'In Progress',
    progress: 76,
    disruptionLevel: 'Low',
    trafficAdvice: 'Trenchless micro-tunnelling beneath service lane. Zero disruption to main carriageway.',
    hasDetour: false,
    contractor: {
      name: 'Metro Fiber Comm Solutions',
      leadEngineer: 'D. Suresh',
      phone: '+91 94451 33451',
      licenseId: 'TN-SMART-FIBER-77',
      slaComplianceRate: 98
    },
    milestones: [
      { id: 1, title: 'Micro-duct installation via HDD', status: 'Completed', proofUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80', date: '2026-09-18' },
      { id: 2, title: 'Manhole chamber cast & sensor nodes', status: 'Completed', proofUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80', date: '2026-10-05' },
      { id: 3, title: 'Fiber jetting & OTDR testing', status: 'In Progress', proofUrl: null, date: '2026-10-28' }
    ],
    delayPenalty: 0,
    citizenComplaintsCount: 1
  }
];

export const INITIAL_CLASHES = [
  {
    id: 'CLASH-001',
    severity: 'Critical',
    title: 'Severe Digging Collision: Road Paving vs Water Pipeline',
    location: 'Velachery Bypass Road (Vijayanagar to Dhandeeswaram)',
    projectAId: 'CW-102',
    projectAName: 'Velachery Bypass Bitumen Micro-Surfacing (PWD)',
    projectADept: 'pwd',
    projectADates: 'Oct 25 – Nov 20, 2026',
    projectBId: 'CW-103',
    projectBName: 'Velachery 450mm Treated Water Feeder Trenching (Metro Water)',
    projectBDept: 'water',
    projectBDates: 'Nov 05 – Dec 15, 2026',
    overlapDays: 16,
    financialWastageRisk: '₹34,50,000 (Freshly laid asphalt will be dug up within 10 days)',
    status: 'Action Required',
    recommendation: 'Enforce Dig-Once Rule: Delay PWD road surfacing until Metro Water lays pipes, or merge both contracts into Joint Utility Trenching.'
  }
];

export const INITIAL_GRIEVANCES = [
  {
    id: 'GRV-401',
    projectId: 'CW-105',
    title: 'Unbarricaded 7ft trench with no reflective lights outside college entrance',
    category: 'Safety Hazard',
    severity: 'High',
    ward: 'Ward 156',
    address: 'Opposite IIITDM Gate 2, Kancheepuram High Road',
    coordinates: [12.8395, 80.0445],
    submittedBy: 'Ananya S. (Student & Resident)',
    phone: '+91 98402 *****',
    dateReported: '2026-10-08 09:30 AM',
    status: 'In Progress',
    assignedOfficer: 'Er. S. Balamurugan (TNEB)',
    upvotes: 48,
    upvotedByUser: false,
    description: 'Contractor dug a deep trench for high tension lines and left it completely unbarricaded. Two two-wheelers nearly skidded yesterday during night drizzle.',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80',
    resolutionNote: 'Safety inspector deployed at 11:30 AM. Contractor issued ₹25,000 spot fine and reflective steel barriers ordered for immediate installation.'
  },
  {
    id: 'GRV-402',
    projectId: 'CW-101',
    title: 'Excavated dirt piled over footpath blocking pedestrian walk to Chromepet bus stand',
    category: 'Pedestrian Obstruction',
    severity: 'Medium',
    ward: 'Ward 174',
    address: 'Near Chromepet Post Office, GST Road',
    coordinates: [12.9525, 80.1415],
    submittedBy: 'M. Natarajan',
    phone: '+91 94441 *****',
    dateReported: '2026-10-09 04:15 PM',
    status: 'Inspected',
    assignedOfficer: 'Er. Anitha Varma (SWD)',
    upvotes: 29,
    upvotedByUser: false,
    description: 'Mud and loose gravel from drain work left on the walkway for over 5 days. Senior citizens are forced to walk on the busy GST road amidst fast traffic.',
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    resolutionNote: 'JCB earthmover scheduled for clearing muck by tonight 11 PM.'
  },
  {
    id: 'GRV-403',
    projectId: 'CW-104',
    title: 'Water pipe leak triggered by slip road excavator work',
    category: 'Utility Damage',
    severity: 'High',
    ward: 'Ward 182',
    address: 'Medavakkam Junction Service Lane',
    coordinates: [12.9185, 80.1915],
    submittedBy: 'K. Balaji',
    phone: '+91 97103 *****',
    dateReported: '2026-10-07 08:00 AM',
    status: 'Resolved',
    assignedOfficer: 'Joint Task Force (PWD & Metro Water)',
    upvotes: 62,
    upvotedByUser: false,
    description: 'Excavator hit an underground distribution branch pipe. Drinking water was gushing out onto the road for 3 hours.',
    photoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    resolutionNote: 'Repaired within 5 hours by emergency valve replacement team. Road surface cleaned and water supply restored.'
  }
];

export const WARD_STATISTICS = {
  totalActiveProjects: 48,
  totalTaxBudgetTracked: '₹46.9 Crores',
  taxpayerMoneySavedViaDeconfliction: '₹1.85 Crores',
  digOnceComplianceRate: '92%',
  averageGrievanceResolutionHours: 31,
  totalClashesPreventedThisQuarter: 14,
  wards: [
    { name: 'Ward 156 (Kancheepuram Academic Hub)', activeWorks: 6, score: 84, onTimePercent: 78 },
    { name: 'Ward 174 (Chromepet GST Corridor)', activeWorks: 8, score: 91, onTimePercent: 88 },
    { name: 'Ward 178 (Velachery Central)', activeWorks: 12, score: 79, onTimePercent: 72 },
    { name: 'Ward 182 (Medavakkam Junction)', activeWorks: 9, score: 93, onTimePercent: 94 },
    { name: 'Ward 191 (OMR Tech Corridor)', activeWorks: 13, score: 95, onTimePercent: 96 }
  ]
};
