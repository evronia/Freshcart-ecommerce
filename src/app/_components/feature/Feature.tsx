interface FeatureProps {
  icon: React.ReactNode;
  text: string;
}

export function Feature({ icon, text }: FeatureProps) {
  return (
    <div className="flex items-center gap-2 text-[15px] text-[#52627a]">
      <span className="text-[#16a34a]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}