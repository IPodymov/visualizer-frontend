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
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-4 right-4 text-6xl font-black text-gray-100 dark:text-gray-800 select-none">
        {step}
      </div>
      <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
