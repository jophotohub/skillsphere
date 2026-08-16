import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, ShieldCheck } from 'lucide-react';

export const WhatIfExplorer: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>('biology_non_doctor');

  const scenarios: Record<string, { question: string; subject: string; alternatives: { name: string; category: string; description: string; id: string }[] }> = {
    biology_non_doctor: {
      question: "What if I study Biology but do not want to pursue clinical medicine?",
      subject: "Biology & Life Sciences",
      alternatives: [
        { id: 'c7', name: 'Bioinformatics Analyst', category: 'Genomic Data', description: 'Analyze genomic DNA sequencing data using Python and computational statistics.' },
        { id: 'c10', name: 'Computational Biology Researcher', category: 'AI & Pharma', description: 'Use AI simulations to accelerate drug discovery and molecular therapeutics.' },
        { id: 'c3', name: 'Clinical Data Analyst', category: 'Healthcare Analytics', description: 'Manage clinical trial statistics, regulatory data, and patient outcome insights.' },
        { id: 'c6', name: 'Healthcare Technology Specialist', category: 'Medical Tech', description: 'Design digital health systems and medical software user interfaces.' }
      ]
    },
    cs_non_coding: {
      question: "What if I like Technology but do not want to write code full-time?",
      subject: "Computer Science & IT",
      alternatives: [
        { id: 'c6', name: 'UI/UX Architect', category: 'Design & Research', description: 'Design application interfaces, conduct user research, and build design systems.' },
        { id: 'c8', name: 'Technical Product Analyst', category: 'Product Strategy', description: 'Bridge business requirements with engineering implementation roadmaps.' },
        { id: 'c5', name: 'Cybersecurity Analyst', category: 'Security & Forensics', description: 'Monitor network telemetry, threat intelligence, and vulnerability defense.' },
        { id: 'c11', name: 'Cloud Solutions Specialist', category: 'Infrastructure', description: 'Architect cloud infrastructure networks on AWS and Google Cloud Platform.' }
      ]
    },
    commerce_tech: {
      question: "What if I study Commerce but want high-growth technology roles?",
      subject: "Commerce & Business Studies",
      alternatives: [
        { id: 'c8', name: 'Financial Analyst (FinTech)', category: 'Finance Tech', description: 'Build automated financial models using SQL, Python, and BI tools.' },
        { id: 'c3', name: 'Business Intelligence Analyst', category: 'Analytics', description: 'Transform enterprise sales data into executive reporting dashboards.' },
        { id: 'c6', name: 'E-Commerce Product Specialist', category: 'Digital Growth', description: 'Optimize digital marketplaces, conversion analytics, and user acquisition.' }
      ]
    }
  };

  const activeScenario = scenarios[selectedPrompt];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-1 border border-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Alternative Career Pathways</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Alternative Career Scenario Simulator
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Simulate non-traditional career paths leveraging core subjects without rigid degree constraints.
        </p>

        {/* Prompt Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 pt-2 text-xs">
          <button
            onClick={() => setSelectedPrompt('biology_non_doctor')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-colors border min-h-[38px] ${
              selectedPrompt === 'biology_non_doctor' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Biology w/o Clinical Medicine
          </button>
          <button
            onClick={() => setSelectedPrompt('cs_non_coding')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-colors border min-h-[38px] ${
              selectedPrompt === 'cs_non_coding' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Tech w/o Pure Software Engineering
          </button>
          <button
            onClick={() => setSelectedPrompt('commerce_tech')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-colors border min-h-[38px] ${
              selectedPrompt === 'commerce_tech' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Commerce + FinTech Analytics
          </button>
        </div>
      </div>

      {/* Alternative Tree Output */}
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs">
          <span className="text-slate-700"><strong className="text-slate-900">Scenario Query:</strong> {activeScenario.question}</span>
          <span className="font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-[10px]">
            {activeScenario.subject}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeScenario.alternatives.map((alt) => (
            <div key={alt.name} className="p-6 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-[10px] font-semibold">
                {alt.category}
              </span>
              <h3 className="text-base font-bold text-slate-900">{alt.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{alt.description}</p>
              
              <div className="pt-2 border-t border-slate-100">
                <Link
                  to={`/careers/${alt.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline min-h-[38px]"
                >
                  <span>Inspect Pathway Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
