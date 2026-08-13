import React from 'react';
import { GraduationCap, Award, Server, Database, Code } from 'lucide-react';

export default function ProjectBadge() {
  return (
    <div className="academic-banner">
      <div className="academic-info">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
          <GraduationCap size={16} color="#38bdf8" />
          CSE Major Engineering Project: <strong>SnapCart</strong>
        </span>
        <span className="academic-badge">Student: K. Taje</span>
        <span className="academic-badge">Roll No: 23NA1A0595</span>
        <span className="academic-badge">Dept: CSE</span>
      </div>
      <div className="academic-info">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Award size={14} color="#f59e0b" />
          Guide: <strong>Prof. Prabhakar</strong>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
          <Database size={12} /> Render & Supabase Connected
        </span>
      </div>
    </div>
  );
}
