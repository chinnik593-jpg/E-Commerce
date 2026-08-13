import React from 'react';
import { GraduationCap, Award, Database, Building2, Sparkles } from 'lucide-react';

export default function ProjectBadge() {
  return (
    <div className="academic-banner">
      <div className="academic-info">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#1e3a8a' }}>
          <Building2 size={16} color="#2563eb" />
          Lingayas Institute of Management and Technology
        </span>
        <span className="academic-badge">Student: K. Teja</span>
        <span className="academic-badge">Roll No: 23NA1A0595</span>
        <span className="academic-badge">Dept: CSE</span>
      </div>
      <div className="academic-info">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Award size={14} color="#f59e0b" />
          Guide: <strong>Prof. Prabhakar</strong>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid #bfdbfe' }}>
          <Database size={12} /> Render & Supabase Live
        </span>
      </div>
    </div>
  );
}
