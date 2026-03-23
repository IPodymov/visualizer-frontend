import { useParams, Link } from 'react-router-dom'
import { useGetPlanByIdQuery, useGetSpecialtyByIdQuery } from '../../../entities/plan'
import { PlanMap } from '../../../widgets/plan-map'
import { PlanTable } from '../../../widgets/plan-table'
import { ComputingLandscape } from '../../../widgets/computing-landscape'
import { ROUTES } from '../../../shared/lib/routes'
import './plan-details-page.css'

export const PlanDetailsPage = () => {
    const { id } = useParams<{ id: string }>()
    const planId = Number(id)
    
    const { data: plan, isLoading, error } = useGetPlanByIdQuery(planId, {
        skip: isNaN(planId),
    })

    const { data: specialty } = useGetSpecialtyByIdQuery(plan?.specialty_id ?? -1, {
        skip: !plan,
    })

    if (isLoading) {
        return <div className="page-state">Загрузка плана...</div>
    }

    if (error || !plan) {
        return (
            <div className="error-text">
                <p>Не удалось найти учебный план.</p>
                <Link to={ROUTES.HOME} className="button-link">Вернуться на главную</Link>
            </div>
        )
    }

    return (
        <section className="plan-details-page">
            <div className="page-header">
                <Link to={ROUTES.HOME} className="back-link">← К списку планов</Link>
                <h1>
                    {specialty ? `${specialty.code} ${specialty.name}` : `Специальность #${plan.specialty_id}`}
                </h1>
                
                <div className="header-meta">
                    <div className="meta-item">
                        <span className="meta-label">Год набора</span>
                        <span className="meta-value">{plan.admission_year}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Дисциплин</span>
                        <span className="meta-value">{plan.items.length}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">ID Плана</span>
                        <span className="meta-value">#{plan.id}</span>
                    </div>
                </div>
            </div>

            <div className="plan-visualization">
                <PlanMap plan={plan} />
                <ComputingLandscape plan={plan} />
                <PlanTable plan={plan} />
            </div>
        </section>
    )
}
