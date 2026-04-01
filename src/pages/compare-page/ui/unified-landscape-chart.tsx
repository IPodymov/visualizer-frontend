import { useMemo } from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { AcademicPlan } from "@/entities/plan/model/types";

type LandscapeCategory = "CSEC" | "IS" | "CE" | "CS" | "IT" | "SE";

type UnifiedLandscapeChartProps = {
  plans: AcademicPlan[];
  planTitles: Map<number, string>;
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

const SERIES_COLORS = ["#0284C7", "#EA580C", "#16A34A"];

const getCategory = (name: string): LandscapeCategory => {
  const lowerName = name.toLowerCase();

  if (lowerName.match(/security|protect|cyber|safe|безопасн|защит/)) {
    return "CSEC";
  }

  if (
    lowerName.match(
      /hardware|arch|circuit|physic|network|system|компьютер|сеть|архитектура|схемотехника/,
    ) ||
    (lowerName.match(/engineer|инженер/) &&
      !lowerName.match(/software|программ/))
  ) {
    return "CE";
  }

  if (
    lowerName.match(
      /business|manage|org|econom|ethic|history|social|управлен|бизнес|эконом|право|истор|социол/,
    )
  ) {
    return "IS";
  }

  if (
    lowerName.match(
      /software|develop|project|test|cycle|программ|разработ|проект|тестир|жизнен/,
    )
  ) {
    return "SE";
  }

  if (
    lowerName.match(
      /math|calculation|analysis|logic|algorithm|intel|ai|learn|data|model|science|математ|анализ|логика|алгоритм|интеллект|данн|наук/,
    )
  ) {
    return "CS";
  }

  return "IT";
};

const countByCategory = (plan: AcademicPlan) => {
  const counts: Record<LandscapeCategory, number> = {
    CSEC: 0,
    IS: 0,
    CE: 0,
    CS: 0,
    IT: 0,
    SE: 0,
  };

  plan.items.forEach((item) => {
    counts[getCategory(item.discipline.name)] += 1;
  });

  return counts;
};

export const UnifiedLandscapeChart = ({
  plans,
  planTitles,
}: UnifiedLandscapeChartProps) => {
  const chartSeries = useMemo(() => {
    return plans.map((plan, index) => ({
      key: `plan${plan.id}`,
      label: planTitles.get(plan.id) ?? `План #${plan.id}`,
      color: SERIES_COLORS[index % SERIES_COLORS.length],
      counts: countByCategory(plan),
    }));
  }, [plans, planTitles]);

  const chartData = useMemo(() => {
    return CATEGORY_ORDER.map((category) => {
      const row: Record<string, number | string> = {
        category,
        fullName: CATEGORY_LABELS[category],
      };

      chartSeries.forEach((series) => {
        row[series.key] = series.counts[category];
      });

      return row;
    });
  }, [chartSeries]);

  const maxValue = useMemo(() => {
    const max = Math.max(
      1,
      ...chartSeries.flatMap((series) =>
        CATEGORY_ORDER.map((category) => series.counts[category]),
      ),
    );

    return Math.ceil(max * 1.2);
  }, [chartSeries]);

  return (
    <ResponsiveContainer width="100%" height={560}>
      <RadarChart data={chartData} outerRadius="72%">
        <PolarGrid stroke="#CBD5E1" />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fill: "#334155", fontSize: 13 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, maxValue]}
          tickCount={6}
          tick={{ fill: "#64748B", fontSize: 11 }}
        />
        <Tooltip
          formatter={(value, name) => [
            `${value} дисциплин`,
            chartSeries.find((series) => series.key === name)?.label ?? name,
          ]}
          labelFormatter={(label, payload) => {
            const point = payload?.[0]?.payload as
              | { fullName?: string }
              | undefined;
            return point?.fullName ?? label;
          }}
        />
        <Legend />
        {chartSeries.map((series) => (
          <Radar
            key={series.key}
            name={series.label}
            dataKey={series.key}
            stroke={series.color}
            fill={series.color}
            fillOpacity={0.16}
            strokeWidth={2}
            isAnimationActive={false}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
};
