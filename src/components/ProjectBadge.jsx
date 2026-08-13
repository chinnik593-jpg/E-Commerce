import React from 'react';
import { GraduationCap, User, BookOpen, Award, Server } from 'lucide-react';

export default function ProjectBadge() {
  return (
    <div className="academic-banner">
      <div className="academic-info">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
          <GraduationCap size={16} color="#38bdf8" />
          Academic Project: SnapCart E-Commerce App
        </span>
        <span className="academic-badge">Student: K. Taje</span>
        <span className="academic-badge">Roll No: 23NA1A0595</span>
        <span className="academic-badge">Dept: CSE</span>
      </div>
      <div className="academic-info">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Award size={14} color="#f59e0b" />
          Guided by: <strong>Prof. Prabhakar</strong>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
          <Server size={12} /> Render.com Free Tier Ready
        </span>
      </div>
    </div>
  );
}
