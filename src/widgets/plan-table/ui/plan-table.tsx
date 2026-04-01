import React, { useMemo } from 'react';
import type { AcademicPlan } from '@/entities/plan/model/types';
import '@/widgets/plan-table/ui/plan-table.css';

interface PlanTableProps {
    plan: AcademicPlan;
}

const HOURS_PER_ZE = 36;

const CONTROL_TYPE_MAP: Record<string, string> = {
    'exam': 'Экзамен',
    'credit': 'Зачет',
    'diff_credit': 'Дифф. зачет',
    'course_project': 'Курсовой проект',
    'course_work': 'Курсовая работа',
};

type DisciplineRow = {
    disciplineName: string;
    disciplineId: number;
    items: { [semester: number]: number }; // hours per semester
    totalHours: number;
    totalZe: number;
    controlTypes: Set<string>;
};

export const PlanTable: React.FC<PlanTableProps> = ({ plan }) => {
    const semesterCount = useMemo(() => {
        const maxSem = Math.max(0, ...plan.items.map((i) => i.semester));
        return maxSem > 8 ? 10 : 8;
    }, [plan]);

    // Group items by discipline
    const rows = useMemo(() => {
        const disciplineMap = new Map<number, DisciplineRow>();

        plan.items.forEach(item => {
            if (!disciplineMap.has(item.discipline_id)) {
                disciplineMap.set(item.discipline_id, {
                    disciplineName: item.discipline.name,
                    disciplineId: item.discipline_id,
                    items: {},
                    totalHours: 0,
                    totalZe: 0,
                    controlTypes: new Set()
                });
            }

            const row = disciplineMap.get(item.discipline_id)!;
            
            // Only consider up to semesterCount
            if (item.semester <= semesterCount) {
                row.items[item.semester] = item.total_hours;
                row.totalHours += item.total_hours;
                row.totalZe += item.total_hours / HOURS_PER_ZE;
                
                if (item.control_type) {
                    row.controlTypes.add(item.control_type);
                }
            }
        }); 

        return Array.from(disciplineMap.values()).sort((a, b) => 
            a.disciplineName.localeCompare(b.disciplineName, 'ru')
        );
    }, [plan, semesterCount]);

    // Generate header cells for semesters
    const semesterHeaders = Array.from({ length: semesterCount }, (_, i) => i + 1);

    return (
        <details className="plan-details">
            <summary className="code-summary">
                <span>План учебного процесса</span>
                <span className="summary-arrow">▼</span>
            </summary>
        
            <div className="plan-table-wrapper">
                <table className="plan-table">
                        <thead>
                            <tr>
                                <th rowSpan={2} style={{ width: '40px' }}>№</th>
                                <th rowSpan={2} style={{ width: '200px' }}>Наименование дисциплины</th>
                                <th rowSpan={2} style={{ width: '80px' }}>Формы контроля</th>
                                <th colSpan={2}>Объем работы</th>
                                <th colSpan={semesterCount}>Распределение по семестрам (часов)</th>
                            </tr>
                            <tr>
                                <th style={{ width: '50px' }}>З.Е.</th>
                                <th style={{ width: '50px' }}>Часов</th>
                                {semesterHeaders.map(s => (
                                    <th key={s} style={{ minWidth: '35px' }}>{s}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.disciplineId}>
                                    <td>{index + 1}</td>
                                    <td className="text-left">{row.disciplineName}</td>
                                    <td>
                                        {Array.from(row.controlTypes).map(t => CONTROL_TYPE_MAP[t] || t).join(', ')}
                                    </td>
                                    <td>{Math.round(row.totalZe * 10) / 10}</td>
                                    <td>{row.totalHours}</td>
                                    
                                    {/* Render cells for each semester */}
                                    {semesterHeaders.map((sem) => {
                                        const hours = row.items[sem];
                                        return (
                                            <td key={sem} style={{ backgroundColor: hours ? '#f0f9ff' : '' }}>
                                                {hours || ''}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </details>
    );
};
