export function OrderCard({ title, value, icon }: any) {
  return (
    <div className="p-4 rounded-xl bg-white  shadow hover:shadow-lg transition-all flex items-center gap-4 cursor-pointer">
      {icon}
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
