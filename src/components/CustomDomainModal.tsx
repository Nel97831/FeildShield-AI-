import React, { useState } from 'react';
import {
  Globe,
  GitBranch,
  Copy,
  Check,
  Download,
  ExternalLink,
  X,
  Server,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  FileCode,
  Info
} from 'lucide-react';

interface CustomDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomDomainModal: React.FC<CustomDomainModalProps> = ({ isOpen, onClose }) => {
  const [domain, setDomain] = useState('fieldshield.org');
  const [githubUser, setGithubUser] = useState('your-github-username');
  const [repoName, setRepoName] = useState('fieldshield-ai');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dns' | 'git' | 'checklist'>('dns');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const isApex = !cleanDomain.startsWith('www.') && cleanDomain.split('.').length === 2;

  const gitCommands = `# 1. Initialize git in your local project folder
git init

# 2. Stage all project files
git add .

# 3. Create your initial commit
git commit -m "Deploy FieldShield AI to GitHub with custom domain ${cleanDomain}"

# 4. Set default branch to main
git branch -M main

# 5. Link to your GitHub repository
git remote add origin https://github.com/${githubUser.trim() || '<username>'}/${repoName.trim() || '<repo>'}.git

# 6. Push to GitHub (Actions will automatically build & deploy!)
git push -u origin main`;

  const downloadCname = () => {
    const blob = new Blob([cleanDomain + '\n'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CNAME';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0B2B26] border border-[#235347] rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#235347] flex items-center justify-between bg-[#051F20]/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                GitHub & Custom Domain Setup
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                  Ready for GitHub Pages
                </span>
              </h2>
              <p className="text-xs text-[#8EB69B]">
                Configure DNS records, CNAME, and GitHub Actions for continuous deployment.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8EB69B] hover:text-white hover:bg-[#163832] transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm text-[#DAF1DE]">
          {/* Domain and Repo Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#051F20] p-4 rounded-xl border border-[#235347]">
            <div className="space-y-1 md:col-span-1">
              <label className="text-xs font-semibold text-[#8EB69B] uppercase tracking-wider block">
                Your Custom Domain
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. fieldshield.org"
                  className="w-full bg-[#0B2B26] border border-[#235347] rounded-lg px-3 py-2 text-sm text-white placeholder-emerald-800/60 focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#8EB69B] uppercase tracking-wider block">
                GitHub Username
              </label>
              <input
                type="text"
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
                placeholder="e.g. farmer-dev"
                className="w-full bg-[#0B2B26] border border-[#235347] rounded-lg px-3 py-2 text-sm text-white placeholder-emerald-800/60 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#8EB69B] uppercase tracking-wider block">
                GitHub Repo Name
              </label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="e.g. fieldshield-ai"
                className="w-full bg-[#0B2B26] border border-[#235347] rounded-lg px-3 py-2 text-sm text-white placeholder-emerald-800/60 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[#235347] gap-2">
            <button
              onClick={() => setActiveTab('dns')}
              className={`pb-2.5 px-3 font-semibold text-xs transition border-b-2 flex items-center gap-1.5 ${
                activeTab === 'dns'
                  ? 'border-emerald-400 text-emerald-300'
                  : 'border-transparent text-[#8EB69B] hover:text-white'
              }`}
            >
              <Server className="w-4 h-4" />
              1. DNS Records to Add
            </button>
            <button
              onClick={() => setActiveTab('git')}
              className={`pb-2.5 px-3 font-semibold text-xs transition border-b-2 flex items-center gap-1.5 ${
                activeTab === 'git'
                  ? 'border-emerald-400 text-emerald-300'
                  : 'border-transparent text-[#8EB69B] hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4" />
              2. Terminal Push Commands
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`pb-2.5 px-3 font-semibold text-xs transition border-b-2 flex items-center gap-1.5 ${
                activeTab === 'checklist'
                  ? 'border-emerald-400 text-emerald-300'
                  : 'border-transparent text-[#8EB69B] hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              3. Verification & HTTPS
            </button>
          </div>

          {/* TAB 1: DNS RECORDS */}
          {activeTab === 'dns' && (
            <div className="space-y-4">
              <div className="bg-[#163832]/50 border border-[#235347] rounded-xl p-3 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  Log into your domain provider (e.g. <strong>Cloudflare, GoDaddy, Namecheap, Google Domains</strong>) and add these records to point <strong>{cleanDomain}</strong> directly to GitHub Pages.
                </span>
              </div>

              {/* Apex Records */}
              <div className="border border-[#235347] rounded-xl overflow-hidden">
                <div className="bg-[#051F20] px-4 py-2 border-b border-[#235347] flex justify-between items-center">
                  <span className="font-semibold text-xs uppercase tracking-wider text-emerald-300">
                    A Records (For Apex Domain: {cleanDomain})
                  </span>
                  <span className="text-[11px] text-[#8EB69B]">Points to official GitHub Anycast IPs</span>
                </div>
                <div className="divide-y divide-[#235347]/60">
                  {[
                    '185.199.108.153',
                    '185.199.109.153',
                    '185.199.110.153',
                    '185.199.111.153',
                  ].map((ip, idx) => (
                    <div key={ip} className="px-4 py-2.5 flex items-center justify-between text-xs font-mono bg-[#0B2B26]/60">
                      <div className="flex items-center gap-4">
                        <span className="w-8 font-bold text-amber-300">A</span>
                        <span className="w-16 text-[#8EB69B]">@</span>
                        <span className="text-white font-medium">{ip}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(ip, `ip-${idx}`)}
                        className="px-2.5 py-1 rounded bg-[#163832] hover:bg-[#235347] text-[#DAF1DE] flex items-center gap-1.5 transition text-[11px]"
                      >
                        {copiedItem === `ip-${idx}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy IP
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CNAME Subdomain Record */}
              <div className="border border-[#235347] rounded-xl overflow-hidden">
                <div className="bg-[#051F20] px-4 py-2 border-b border-[#235347] flex justify-between items-center">
                  <span className="font-semibold text-xs uppercase tracking-wider text-emerald-300">
                    CNAME Record (For www.{cleanDomain})
                  </span>
                  <span className="text-[11px] text-[#8EB69B]">Alias for www redirect</span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between text-xs font-mono bg-[#0B2B26]/60">
                  <div className="flex items-center gap-4">
                    <span className="w-8 font-bold text-cyan-300">CNAME</span>
                    <span className="w-16 text-[#8EB69B]">www</span>
                    <span className="text-white font-medium">
                      {(githubUser.trim() || 'username')}.github.io.
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${(githubUser.trim() || 'username')}.github.io.`,
                        'cname-val'
                      )
                    }
                    className="px-2.5 py-1 rounded bg-[#163832] hover:bg-[#235347] text-[#DAF1DE] flex items-center gap-1.5 transition text-[11px]"
                  >
                    {copiedItem === 'cname-val' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Target
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Download CNAME & Configuration Files */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#051F20] rounded-xl border border-[#235347]">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs">
                    Current file: <code className="text-emerald-300 font-mono">public/CNAME</code> contains{' '}
                    <strong>{cleanDomain}</strong>
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={downloadCname}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 transition shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download CNAME
                  </button>
                  <button
                    onClick={() => copyToClipboard(cleanDomain, 'cname-text')}
                    className="px-3 py-1.5 rounded-lg bg-[#163832] hover:bg-[#235347] text-[#DAF1DE] text-xs flex items-center gap-1.5 transition"
                  >
                    {copiedItem === 'cname-text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Domain Name
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TERMINAL COMMANDS */}
          {activeTab === 'git' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8EB69B]">
                  Run these commands in your project root terminal to push to GitHub:
                </span>
                <button
                  onClick={() => copyToClipboard(gitCommands, 'git-all')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 transition shadow"
                >
                  {copiedItem === 'git-all' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied All Commands!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy All Commands
                    </>
                  )}
                </button>
              </div>

              <div className="relative bg-[#051F20] border border-[#235347] rounded-xl p-4 font-mono text-xs overflow-x-auto">
                <pre className="text-emerald-300 leading-relaxed whitespace-pre">{gitCommands}</pre>
              </div>

              <div className="p-3 bg-[#163832]/40 border border-[#235347] rounded-xl text-xs space-y-1.5">
                <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  GitHub Actions Automation Included
                </div>
                <p className="text-[#8EB69B] leading-relaxed">
                  We have added <code className="text-white font-mono">.github/workflows/deploy.yml</code> to this project. As soon as you run <code className="text-white font-mono">git push</code>, GitHub will automatically install dependencies, build the Vite app, bundle your CNAME, and deploy it to GitHub Pages.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CHECKLIST & HTTPS */}
          {activeTab === 'checklist' && (
            <div className="space-y-3">
              {[
                {
                  title: '1. Create repository on GitHub',
                  desc: 'Create a new public or private repository on github.com (do not initialize with README or license).',
                },
                {
                  title: '2. Push code to main branch',
                  desc: 'Execute git push -u origin main. Check the Actions tab in GitHub to see the automated build finish.',
                },
                {
                  title: '3. Enable GitHub Pages in Repo Settings',
                  desc: 'Navigate to Repo Settings → Pages → Build and deployment → select "GitHub Actions" as the Source.',
                },
                {
                  title: '4. Verify Custom Domain in GitHub Pages',
                  desc: `Under Custom domain, confirm "${cleanDomain}" is detected from your CNAME file. GitHub will check DNS automatically.`,
                },
                {
                  title: '5. Check "Enforce HTTPS"',
                  desc: 'Once DNS resolves, tick "Enforce HTTPS" for free automatic TLS/SSL certificates managed by GitHub.',
                },
              ].map((step, idx) => (
                <div key={idx} className="p-3.5 bg-[#051F20] border border-[#235347] rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-emerald-500/30">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{step.title}</h4>
                    <p className="text-xs text-[#8EB69B] mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#235347] bg-[#051F20]/90 flex items-center justify-between">
          <div className="text-xs text-[#8EB69B]">
            Status: <span className="text-emerald-400 font-medium">Configured for custom domain & GitHub Actions</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#163832] hover:bg-[#235347] text-white text-xs font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
