import { Link } from 'react-router-dom'
import { ROUTES } from '../../../shared/lib/routes'
import type {AcademicPlan} from '../model/types'
import './plan-card.css'

type PlanCardProps = {
    plan: AcademicPlan
    specialtyName?: string
}

export const PlanCard = ({plan, specialtyName}: PlanCardProps) => {
    const totalHours = plan.items.reduce((sum, item) => sum + item.total_hours, 0)
    const disciplinesCount = plan.items.length
    const semesters = new Set(plan.items.map((i) => i.semester)).size
    
    // Generate a consistent gradient based on the plan ID
    const hue = (plan.id * 137) % 360;
    const gradient = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue + 40}, 80%, 40%))`;

    return (
        <article className="plan-card">
            <div className="plan-card__image-container" style={{ background: gradient }}>
                <span className="plan-card__badge-year">{plan.admission_year}</span>
                <div className="plan-card__image-overlay"></div>
            </div>

            <div className="plan-card__content">
                <h3 className="plan-card__title" title={specialtyName}>
                    {specialtyName ?? `Специальность #${plan.specialty_id}`}
                </h3>
                
                <div className="plan-card__meta">
                    <div className="plan-card__meta-item">
                        <span className="meta-value">{disciplinesCount}</span>
                        <span className="meta-label">дисц.</span>
                    </div>
                    <div className="plan-card__meta-divider"></div>
                    <div className="plan-card__meta-item">
                        <span className="meta-value">{semesters}</span>
                        <span className="meta-label">сем.</span>
                    </div>
                    <div className="plan-card__meta-divider"></div>
                    <div className="plan-card__meta-item">
                        <span className="meta-value">{totalHours}</span>
                        <span className="meta-label">час.</span>
                    </div>
                </div>

                <Link 
                    to={ROUTES.PLAN.replace(':id', String(plan.id))} 
                    className="plan-card__button"
                >
                    Подробнее
                </Link>
            </div>
        </article>
    )
}

