import { Suspense } from 'react'
import Image from 'next/image';
import Skeleton from '@/Ui/skeleton';
import { cacheLife } from 'next/cache';
export default function Page() {
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 py-8">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Image 
                            src="https://avatars.githubusercontent.com/u/183381109?v=4" 
                            alt="Esh-ankhi"
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                            priority 
                          />
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Esh-ankhi
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                GitHub Repositories
              </p>
            </div>
          </div>
          
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">30+</div>
              <div className="text-gray-500 dark:text-gray-400">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
              <div className="text-gray-500 dark:text-gray-400">Stars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">100+</div>
              <div className="text-gray-500 dark:text-gray-400">Forks</div>
            </div>
          </div>
        </div>
        <Suspense fallback={<Skeleton />}>
          <RepoList />
        </Suspense>
      </div>
    </div>
  );
}

async function RepoList() {
  'use cache'
  cacheLife('hours');
  console.log("cached not");
  await new Promise(res => setTimeout(res, 3000));
  const res = await fetch('https://api.github.com/users/Esh-ankhi/repos', {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) throw new Error('Failed to fetch repositories');
  const repos = await res.json();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo: any) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}

function RepoCard({ repo }: { repo: any }) {
  const languageColors: { [key: string]: string } = {
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-600',
    Python: 'bg-green-500',
    Java: 'bg-red-500',
    CSS: 'bg-purple-500',
    HTML: 'bg-orange-500',
    PHP: 'bg-indigo-500',
    'C++': 'bg-pink-500',
    Ruby: 'bg-red-600',
    Go: 'bg-cyan-500',
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {repo.name}
            </h3>
          </div>
          
          {repo.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
              {repo.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        {repo.language && (
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${languageColors[repo.language] || 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{repo.language}</span>
          </div>
        )}
        
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1 hover:text-yellow-600 transition-colors">
            <span>⭐</span>
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-green-600 transition-colors">
            <span>🍴</span>
            <span>{repo.forks_count}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Popularity</span>
          <span>{repo.stargazers_count} stars</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(repo.stargazers_count * 2, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Updated {new Date(repo.updated_at).toLocaleDateString()}
        </span>
        
        <button className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
          View Code
        </button>
      </div>

      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}