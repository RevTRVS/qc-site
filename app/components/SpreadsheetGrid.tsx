import SpreadsheetCard from "./SpreadsheetCard";
import { Spreadsheet } from "@/app/types";

interface SpreadsheetGridProps {
  spreadsheets: Spreadsheet[];
  title?: string;
}

export default function SpreadsheetGrid({
  spreadsheets,
  title = "Trending Spreadsheets",
}: SpreadsheetGridProps) {
  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">
          {title}
          <span className="text-green-500 ml-2">›</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Discover trending spreadsheets from the community. Like, share, and save your favorites!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spreadsheets.map((spreadsheet) => (
            <SpreadsheetCard
              key={spreadsheet.id}
              spreadsheet={spreadsheet}
            />
          ))}
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-float pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float pointer-events-none -z-10" style={{ animationDelay: "1s" }}></div>
    </section>
  );
}
