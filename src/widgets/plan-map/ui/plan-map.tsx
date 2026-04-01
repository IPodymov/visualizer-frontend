import React, { useMemo, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { AcademicPlan, PlanItem } from "@/entities/plan/model/types";
import "@/widgets/plan-map/ui/plan-map.css";

interface PlanMapProps {
  plan: AcademicPlan;
}

const HOURS_PER_ZE = 36; // 1 Credit Unit ~ 36 hours
const COL_WIDTH = 130; // Fixed width for semester columns
const ROW_HEIGHT = 45; // Fixed height for ZE rows
const HEADER_HEIGHT = 40; // Height for semester headers
const ZE_COL_WIDTH = 50; // Width for ZE column

// Helper to determine color based on discipline properties
const getColorClass = (item: PlanItem, index: number): string => {
  // Ideally use domain_type or layer_type
  const type =
    item.discipline.domain_type || item.discipline.layer_type || "default";
  if (!type) return `color-scheme-${(index % 6) + 1}`;

  // Simple hash for consistent coloring
  let hash = 0;
  for (let i = 0; i < type.length; i++) {
    hash = type.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash % 6) + 1;
  return `color-scheme-${colorIndex}`;
};

export const PlanMap: React.FC<PlanMapProps> = ({ plan }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const semesterCount = useMemo(() => {
    const maxSem = Math.max(0, ...plan.items.map((i) => i.semester));
    return maxSem > 8 ? 10 : 8;
  }, [plan]);

  // Prepare grid data
  // We need to calculate row start/end for each item strictly to align across Z.E.
  const { alignedItems, maxRows } = useMemo(() => {
    const semesterCurrentRow: Record<number, number> = {};
    for (let i = 1; i <= semesterCount; i++) {
      semesterCurrentRow[i] = 2; // Start at row 2 (row 1 is header)
    }

    const itemsBySemester: Record<number, PlanItem[]> = {};

    // Sort items by semester first
    plan.items.forEach((item) => {
      const sem = item.semester;
      if (!itemsBySemester[sem]) itemsBySemester[sem] = [];
      itemsBySemester[sem].push(item);
    });

    // Sort items within each semester by name for consistent layout
    Object.keys(itemsBySemester).forEach((semKey) => {
      const sem = parseInt(semKey);
      itemsBySemester[sem].sort((a, b) =>
        a.discipline.name.localeCompare(b.discipline.name),
      );
    });

    const pixelPerfectItems: Array<{
      item: PlanItem;
      style: React.CSSProperties;
      colorClass: string;
    }> = [];

    Object.keys(itemsBySemester).forEach((semKey) => {
      const sem = parseInt(semKey);
      const items = itemsBySemester[sem];

      items.forEach((item, idx) => {
        const ze = Math.max(1, Math.round(item.total_hours / HOURS_PER_ZE)); // Minimum 1 ZE
        const startRow = semesterCurrentRow[sem];
        const endRow = startRow + ze;

        pixelPerfectItems.push({
          item,
          style: {
            gridColumn: sem + 1, // +1 for ZE column offset
            gridRow: `${startRow} / ${endRow}`,
          },
          colorClass: getColorClass(item, idx),
        });

        semesterCurrentRow[sem] = endRow;
      });
    });

    const maxR = Math.max(...Object.values(semesterCurrentRow));
    return { alignedItems: pixelPerfectItems, maxRows: maxR };
  }, [plan, semesterCount]);

  // Generate PDF
  const handleDownloadPdf = async () => {
    if (!mapRef.current) return;

    try {
      const element = mapRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: element.scrollWidth, // Ensure we capture full width
        height: element.scrollHeight, // Ensure we capture full height
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`academic-plan-${plan.id}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF", err);
      alert("Не удалось создать PDF. Попробуйте снова.");
    }
  };

  // Render Z.E. scale (Left Axis)
  const zeRows = [];
  for (let r = 2; r < maxRows; r++) {
    zeRows.push(
      <div
        key={`ze-${r}`}
        className="ze-header"
        style={{ gridRow: r, gridColumn: 1 }}
      >
        {r - 1}
      </div>,
    );
  }

  // Render Semester Headers (Top Axis)
  const semesterHeaders = [];
  for (let s = 1; s <= semesterCount; s++) {
    semesterHeaders.push(
      <div
        key={`sem-${s}`}
        className="semester-header"
        style={{ gridColumn: s + 1 }}
      >
        {s} сем
      </div>,
    );
  }

  return (
    <details className="plan-details">
      <summary className="code-summary">
        <span>Карта дисциплин</span>
        <span className="summary-arrow">▼</span>
      </summary>
      <div className="plan-map-wrapper">
        <div className="plan-map-controls">
          <button onClick={handleDownloadPdf} className="pdf-download-btn">
            Скачать PDF
          </button>
        </div>

        <div className="plan-map-container" ref={mapRef}>
          <div
            className="plan-grid"
            style={{
              gridTemplateColumns: `${ZE_COL_WIDTH}px repeat(${semesterCount}, ${COL_WIDTH}px)`,
              gridTemplateRows: `${HEADER_HEIGHT}px repeat(${maxRows - 2}, ${ROW_HEIGHT}px)`,
              width: `${ZE_COL_WIDTH + semesterCount * COL_WIDTH}px`, // Explicit width to prevent jumping
            }}
          >
            {/* Headers */}
            <div className="ze-header" style={{ gridRow: 1, gridColumn: 1 }}>
              Z.E.
            </div>
            {semesterHeaders}

            {/* Left Axis: Z.E. Numbers */}
            {zeRows}

            {/* Content Items */}
            {alignedItems.map((gridItem) => (
              <div
                key={`item-${gridItem.item.id}`}
                className={`plan-item ${gridItem.colorClass}`}
                style={gridItem.style}
                title={`${gridItem.item.discipline.name} (${gridItem.item.total_hours}ч)`}
              >
                {gridItem.item.discipline.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
};
