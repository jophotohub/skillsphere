import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { careerService } from '../services/api';
import { Career } from '../types';
import { 
  Orbit, 
  Compass, 
  X, 
  ArrowRight, 
  DollarSign, 
  Star, 
  Cpu, 
  Code, 
  Database, 
  Palette, 
  Stethoscope,
  List,
  Grid
} from 'lucide-react';

export const CareerGalaxy: React.FC = () => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await careerService.getCareers();
        setCareers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const categories = ['All', 'Engineering & Tech', 'Data & AI', 'Design & Creative', 'Business & Finance', 'Healthcare & Bio', 'Robotics & Core'];

  const filteredCareers = activeCategoryFilter === 'All' 
    ? careers 
    : careers.filter(c => c.category === activeCategoryFilter);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Engineering & Tech': return <Code className="w-4 h-4 text-blue-600" />;
      case 'Data & AI': return <Database className="w-4 h-4 text-blue-600" />;
      case 'Design & Creative': return <Palette className="w-4 h-4 text-slate-700" />;
      case 'Business & Finance': return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'Healthcare & Bio': return <Stethoscope className="w-4 h-4 text-slate-700" />;
      case 'Robotics & Core': return <Cpu className="w-4 h-4 text-slate-700" />;
      default: return <Compass className="w-4 h-4 text-slate-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-800 font-sans">
        <div className="w-10 h-10 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Loading Career Directory Nodes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-2 border border-slate-700">
            <Orbit className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive Constellation Map</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Career Domain Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Interconnected degree paths and industry domain specializations mapped with required prerequisites and skill levels.
          </p>
        </div>

        {/* View Toggle Button */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700 self-stretch sm:self-auto shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              viewMode === 'grid' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              viewMode === 'list' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List View</span>
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategoryFilter(cat)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border shrink-0 min-h-[38px] ${
              activeCategoryFilter === cat
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid View or List View */}
      {viewMode === 'grid' ? (
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 relative min-h-[450px] flex flex-col items-center justify-center shadow-xs">
          
          <div className="relative z-10 mb-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-slate-900 text-white inline-flex items-center justify-center font-bold text-xs shadow-xs">
              SS
            </div>
            <span className="block text-[10px] uppercase font-semibold text-slate-500 mt-1.5">
              Current Origin Point
            </span>
          </div>

          <div className="w-full max-w-6xl relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCareers.map((career) => (
                <div
                  key={career.id}
                  onClick={() => setSelectedCareer(career)}
                  className="group p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer transition-all flex flex-col justify-between space-y-3 shadow-xs hover:bg-white"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="p-1.5 rounded bg-white border border-slate-200">
                      {getCategoryIcon(career.category)}
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      {career.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {career.name}
                    </h3>
                    <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">
                      {career.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {career.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                      <Star className="w-3.5 h-3.5 text-blue-600 fill-blue-600" /> Rating {career.demandRating || 5}/5
                    </span>
                    <span className="font-semibold text-blue-600 flex items-center gap-1 text-[11px]">
                      Inspect <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* List View */
        <div className="space-y-2">
          {filteredCareers.map((career) => (
            <div
              key={career.id}
              onClick={() => setSelectedCareer(career)}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 shrink-0">
                  {getCategoryIcon(career.category)}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{career.name}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {career.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{career.description}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCareer(career)}
                className="w-full sm:w-auto px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal Details Drawer */}
      {selectedCareer && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl p-6 sm:p-8 text-slate-900 max-h-[90vh] overflow-y-auto space-y-6 relative shadow-lg">
            
            <button
              onClick={() => setSelectedCareer(null)}
              className="absolute right-5 top-5 p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 border-b border-slate-100 pb-4">
              <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold">
                {selectedCareer.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">{selectedCareer.name}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedCareer.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px] font-semibold uppercase">Salary Index</span>
                <span className="font-bold text-slate-900 text-xs block mt-0.5">{selectedCareer.salaryRange || '$80k - $140k'}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px] font-semibold uppercase">Difficulty Index</span>
                <span className="font-bold text-slate-900 text-xs block mt-0.5">{selectedCareer.difficulty}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px] font-semibold uppercase">Demand Level</span>
                <span className="font-bold text-slate-900 block mt-0.5 text-xs">
                  {selectedCareer.demandRating || 5}/5
                </span>
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                Required Prerequisite Skills
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedCareer.requiredSkills.map((req) => (
                  <span key={req.skillName} className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 font-semibold text-slate-800">
                    {req.skillName} ({req.requiredLevel}%)
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Paths */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                Academic Pathways
              </h3>
              <ul className="space-y-1 text-xs text-slate-600 list-disc pl-4 font-medium">
                {selectedCareer.educationPaths.map((edu) => (
                  <li key={edu}>{edu}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  navigate(`/careers/${selectedCareer.id}`);
                  setSelectedCareer(null);
                }}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 min-h-[42px]"
              >
                <span>View Complete Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
