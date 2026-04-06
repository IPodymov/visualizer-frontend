type FeatureCardProps = {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
};

export const FeatureCard = ({
  icon,
  step,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <div className="step-card">
      <div className="step-card__number">{step}</div>
      <div className="step-card__icon-wrap">
        {icon}
      </div>
      <h3 className="step-card__title">{title}</h3>
      <p className="step-card__desc">{description}</p>
    </div>
  );
};
