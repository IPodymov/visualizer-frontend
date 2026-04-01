import React, { memo, useMemo } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { AcademicPlan } from "@/entities/plan/model/types";
import "@/widgets/computing-landscape/ui/computing-landscape.css";

interface ComputingLandscapeProps {
  plan: AcademicPlan;
}

type LandscapeCategory = "CSEC" | "IS" | "CE" | "CS" | "IT" | "SE";

type ChartPoint = {
  category: LandscapeCategory;
  label: string;
  value: number;
  fullName: string;
};

// Map discipline names to categories
const getCategory = (name: string): LandscapeCategory => {
  const lowerName = name.toLowerCase();

  // Security / CSEC
  if (lowerName.match(/security|protect|cyber|safe|безопасн|защит/)) {
    return "CSEC";
  }

  // Hardware / Systems / CE
  if (
    lowerName.match(
      /hardware|arch|circuit|physic|network|system|компьютер|сеть|архитектура|схемотехника/,
    ) ||
    (lowerName.match(/engineer|инженер/) &&
      !lowerName.match(/software|программ/))
  ) {
    return "CE";
  }

  // Organizational / Business / IS
  if (
    lowerName.match(
      /business|manage|org|econom|ethic|history|social|управлен|бизнес|эконом|право|истор|социол/,
    )
  ) {
    return "IS";
  }

  // Software Engineering / SE
  if (
    lowerName.match(
      /software|develop|project|test|cycle|программ|разработ|проект|тестир|жизнен/,
    )
  ) {
    return "SE";
  }

  // Computer Science / CS (Theory, Math, AI, Algo)
  if (
    lowerName.match(
      /math|calculation|analysis|logic|algorithm|intel|ai|learn|data|model|science|математ|анализ|логика|алгоритм|интеллект|данн|наук/,
    )
  ) {
    return "CS";
  }

  // Default to IT (Platforms, Tech, Web, etc)
  return "IT";
};

const CATEGORY_ORDER: LandscapeCategory[] = [
  "CSEC",
  "IS",
  "CE",
  "CS",
  "IT",
  "SE",
];

const CATEGORY_LABELS: Record<LandscapeCategory, string> = {
  CSEC: "Cybersecurity",
  IS: "Information Systems",
  CE: "Computer Engineering",
  CS: "Computer Science",
  IT: "Information Technology",
  SE: "Software Engineering",
};

const LandscapeTooltip = memo(
  ({
    active,
    payload,
    categoryItems,
  }: {
    active?: boolean;
    payload?: Array<{ payload: ChartPoint }>;
    categoryItems: Record<LandscapeCategory, string[]>;
  }) => {
    if (!active || !payload || payload.length === 0) return null;

    const point = payload[0].payload;
    const names = categoryItems[point.category] ?? [];

    return (
      <div className="landscape-tooltip">
        <div className="tooltip-title">{point.fullName}</div>
        <div className="tooltip-count">Дисциплин: {point.value}</div>
        {names.length > 0 ? (
          <ul className="tooltip-list">
            {names.slice(0, 8).map((name) => (
              <li key={name}>{name}</li>
            ))}
            {names.length > 8 && <li>... и еще {names.length - 8}</li>}
          </ul>
        ) : (
          <div className="tooltip-empty">Нет дисциплин в категории</div>
        )}
      </div>
    );
  },
);

LandscapeTooltip.displayName = "LandscapeTooltip";

export const ComputingLandscape: React.FC<ComputingLandscapeProps> = memo(
  ({ plan }) => {
    const categoryData = useMemo(() => {
      const counts: Record<LandscapeCategory, number> = {
        CSEC: 0,
        IS: 0,
        CE: 0,
        CS: 0,
        IT: 0,
        SE: 0,
      };
      const items: Record<LandscapeCategory, string[]> = {
        CSEC: [],
        IS: [],
        CE: [],
        CS: [],
        IT: [],
        SE: [],
      };

      plan.items.forEach((item) => {
        const cat = getCategory(item.discipline.name);
        counts[cat]++;
        items[cat].push(item.discipline.name);
      });

      return { counts, items };
    }, [plan]);

    const chartData = useMemo<ChartPoint[]>(() => {
      return CATEGORY_ORDER.map((category) => ({
        category,
        label: category,
        value: categoryData.counts[category],
        fullName: CATEGORY_LABELS[category],
      }));
    }, [categoryData]);

    const maxValue = useMemo(() => {
      const max = Math.max(...chartData.map((point) => point.value), 1);
      return Math.ceil(max * 1.2);
    }, [chartData]);

    return (
      <div className="landscape-wrapper">
        <details className="plan-details " open>
          <summary className="code-summary">
            <span>Ландшафт компьютерного образования</span>
            <span className="summary-arrow">▼</span>
          </summary>

          <div className="landscape-container">
            <div className="landscape-chart-surface">
              <h3 className="landscape-title">Computing Landscape</h3>
              <ResponsiveContainer width="100%" height={520}>
                <RadarChart data={chartData} outerRadius="72%">
                  <PolarGrid stroke="#CBD5E1" />
                  <PolarAngleAxis
                    dataKey="label"
                    tick={{ fill: "#334155", fontSize: 13 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, maxValue]}
                    tickCount={6}
                    tick={{ fill: "#64748B", fontSize: 11 }}
                  />
                  <Tooltip
                    content={
                      <LandscapeTooltip categoryItems={categoryData.items} />
                    }
                    wrapperStyle={{ outline: "none" }}
                  />
                  <Radar
                    name="Дисциплины"
                    dataKey="value"
                    stroke="#0EA5E9"
                    fill="#38BDF8"
                    fillOpacity={0.36}
                    strokeWidth={2}
                    isAnimationActive={false}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <p className="landscape-caption">
                Распределение дисциплин по направлениям CSEC, IS, CE, CS, IT и
                SE.
              </p>
            </div>
          </div>
        </details>
      </div>
    );
  },
);

ComputingLandscape.displayName = "ComputingLandscape";
