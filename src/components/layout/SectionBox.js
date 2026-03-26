export default function SectionBox({ children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow m-6">
      {children}
    </div>
  );
}
