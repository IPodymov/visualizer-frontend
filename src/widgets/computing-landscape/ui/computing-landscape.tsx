import React, { useMemo } from 'react';
import type { AcademicPlan } from '../../../entities/plan/model/types';
import './computing-landscape.css';

interface ComputingLandscapeProps {
  plan: AcademicPlan;
}

type LandscapeCategory = 'CSEC' | 'IS' | 'CE' | 'CS' | 'IT' | 'SE';

// Map discipline names to categories
const getCategory = (name: string): LandscapeCategory => {
  const lowerName = name.toLowerCase();

  // Security / CSEC
  if (lowerName.match(/security|protect|cyber|safe|безопасн|защит/)) {
    return 'CSEC';
  }

  // Hardware / Systems / CE
  if (
    lowerName.match(
      /hardware|arch|circuit|physic|network|system|компьютер|сеть|архитектура|схемотехника/
    ) ||
    (lowerName.match(/engineer|инженер/) && !lowerName.match(/software|программ/))
  ) {
    return 'CE';
  }

  // Organizational / Business / IS
  if (
    lowerName.match(
      /business|manage|org|econom|ethic|history|social|управлен|бизнес|эконом|право|истор|социол/
    )
  ) {
    return 'IS';
  }

  // Software Engineering / SE
  if (
    lowerName.match(/software|develop|project|test|cycle|программ|разработ|проект|тестир|жизнен/)
  ) {
    return 'SE';
  }

  // Computer Science / CS (Theory, Math, AI, Algo)
  if (
    lowerName.match(
      /math|calculation|analysis|logic|algorithm|intel|ai|learn|data|model|science|математ|анализ|логика|алгоритм|интеллект|данн|наук/
    )
  ) {
    return 'CS';
  }

  // Default to IT (Platforms, Tech, Web, etc)
  return 'IT';
};

const CATEGORY_CONFIG: Record<
  string,
  {
    cx: number;
    cy: number;
    baseRx: number;
    baseRy: number;
    color: string;
    label: string;
    angle: number;
  }
> = {
  CSEC: { cx: 280, cy: 220, baseRx: 100, baseRy: 120, color: '#9333EA', label: 'CSEC', angle: -20 },
  IS: { cx: 520, cy: 220, baseRx: 100, baseRy: 120, color: '#9333EA', label: 'IS', angle: 20 },
  CE: { cx: 280, cy: 420, baseRx: 90, baseRy: 110, color: '#0EA5E9', label: 'CE', angle: -10 },
  CS: { cx: 520, cy: 420, baseRx: 90, baseRy: 110, color: '#16A34A', label: 'CS', angle: 10 },
  IT: { cx: 400, cy: 320, baseRx: 80, baseRy: 120, color: '#F59E0B', label: 'IT', angle: 0 },
  SE: { cx: 400, cy: 380, baseRx: 70, baseRy: 70, color: '#EF4444', label: 'SE', angle: 0 },
};

export const ComputingLandscape: React.FC<ComputingLandscapeProps> = ({ plan }) => {
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {
      CSEC: 0,
      IS: 0,
      CE: 0,
      CS: 0,
      IT: 0,
      SE: 0,
    };
    const items: Record<string, string[]> = {
      CSEC: [],
      IS: [],
      CE: [],
      CS: [],
      IT: [],
      SE: [],
    };

    plan.items.forEach((item) => {
      const cat = getCategory(item.discipline.name);
      if (counts[cat] !== undefined) {
        counts[cat]++;
        items[cat].push(item.discipline.name);
      } else {
        // Fallback if logic is extended
        counts['IT']++;
        items['IT'].push(item.discipline.name);
      }
    });

    return { counts, items };
  }, [plan]);

  return (
    <div className="landscape-wrapper">
      <details className="plan-details " open>
        <summary className="code-summary">
          <span>Ландшафт компьютерного образования</span>
          <span className="summary-arrow">▼</span>
        </summary>

        <div className="landscape-container">
          <svg viewBox="0 0 800 600" className="landscape-svg">
            {/* Background Labels */}
            <text x="400" y="40" textAnchor="middle" className="landscape-title" fill="#AA3333">
              Computing
            </text>

            {/* Axes Labels */}
            <text x="50" y="580" textAnchor="start" className="axis-label" fontWeight="bold">
              Hardware
            </text>
            <text x="400" y="580" textAnchor="middle" className="axis-label" fontWeight="bold">
              Software
            </text>
            <text x="750" y="580" textAnchor="end" className="axis-label" fontWeight="bold">
              Organizational Needs
            </text>

            <text x="20" y="500" textAnchor="end" className="axis-label-vert">
              Computing Foundations
            </text>
            <text x="20" y="300" textAnchor="end" className="axis-label-vert">
              Computing Technology
            </text>
            <text x="20" y="100" textAnchor="end" className="axis-label-vert">
              Domain Activity
            </text>

            {/* Main Outer Circle (visual reference only) */}
            <circle cx="400" cy="320" r="260" fill="none" stroke="#E5E7EB" strokeWidth="1" />

            {/* Dynamic Categories */}
            {Object.keys(CATEGORY_CONFIG).map((key) => {
              const cat = key as LandscapeCategory;
              const config = CATEGORY_CONFIG[cat];
              const count = categoryData.counts[cat];

              // Scaling Logic:
              // If count is 0 => Scale 0.5 (small but visible placeholder)
              // If count > 0 => Scale 1.0 + (count * 0.03), capped at 1.4
              const scale = count === 0 ? 0.5 : Math.min(1.4, 1.0 + count * 0.03);

              const rx = config.baseRx * scale;
              const ry = config.baseRy * scale;

              // Opacity increases with count
              const opacity = count === 0 ? 0.05 : Math.min(0.3, 0.1 + count * 0.01);

              return (
                <g key={cat} className="category-group">
                  {/* Circle/Ellipse Shape */}
                  <ellipse
                    cx={config.cx}
                    cy={config.cy}
                    rx={rx}
                    ry={ry}
                    fill={config.color}
                    fillOpacity={opacity}
                    stroke={config.color}
                    strokeWidth={count > 0 ? 2 : 1}
                    strokeDasharray="6,4"
                    transform={`rotate(${config.angle} ${config.cx} ${config.cy})`}
                    className="category-ellipse">
                    {/* Native Tooltip */}
                    <title>
                      {`${config.label}: ${count} дисциплин(ы)
----------------
${categoryData.items[cat].slice(0, 15).join('\n')}
${categoryData.items[cat].length > 15 ? `...и еще ${categoryData.items[cat].length - 15}` : ''}`}
                    </title>
                  </ellipse>

                  {/* Label (Center) */}
                  <text
                    x={config.cx}
                    y={config.cy}
                    className="area-label-code"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{ fontSize: count > 0 ? '16px' : '12px', opacity: count > 0 ? 1 : 0.5 }}>
                    {config.label}
                  </text>

                  {/* Count (Below Label) */}
                  {count > 0 && (
                    <text
                      x={config.cx}
                      y={config.cy + 20}
                      className="area-label-count"
                      textAnchor="middle"
                      fill="#333"
                      fontSize="12px"
                      fontWeight="bold">
                      {count}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </details>
    </div>
  );
};
