import Link from 'next/link';

import {
  ArrowRight,
  Blocks,
  Building2,
  Landmark,
  Network,
  Search,
  Users,
} from 'lucide-react';

import { HREFS } from '@/shared/core/constants';
import { AppHeader } from '@/shared/components/app-header';
import { AppHeaderProvider } from '@/shared/components/app-header/context';
import { EcosystemMark } from '@/shared/components/ecosystem-mark';

import { Footer } from '@/home/components/footer';
import { HomePeopleSnapshot } from '@/home/components/home-people-snapshot';
import { ActiveSearchHiddenWrapper } from '@/search/components/active-search-hidden-wrapper';
import { ActiveSearchResults } from '@/search/components/active-search-results';
import { SearchResultInput } from '@/search/components/search-result-input';

const DISCOVERY_PATHS = [
  {
    title: 'Organizations',
    description:
      'Inspect teams, maintainers, projects, funding, and current hiring activity.',
    href: HREFS.ORGS_PAGE,
    icon: Building2,
  },
  {
    title: 'Projects',
    description:
      'Trace the products and protocols that connect organizations across ecosystems.',
    href: HREFS.PROJECTS_PAGE,
    icon: Blocks,
  },
  {
    title: 'Funds',
    description:
      'Explore investors, portfolios, rounds, team data, and capital relationships.',
    href: HREFS.FUNDS_PAGE,
    icon: Landmark,
  },
  {
    title: 'People',
    description:
      'Follow internal contributors, maintainers, lead developers, and organization movement over time.',
    href: HREFS.PEOPLE_PAGE,
    icon: Users,
  },
] as const;

export const HomePage = () => (
  <div className="overflow-hidden bg-[#070708] font-inter text-white lg:pt-0">
    <AppHeaderProvider>
      <AppHeader
        input={<SearchResultInput isAutoFocus={false} />}
        searchResults={<ActiveSearchResults />}
      />
    </AppHeaderProvider>
    <ActiveSearchHiddenWrapper>
      <main className="relative mx-auto mt-[122px] max-w-[1500px] px-5 pb-28 pt-12 md:px-10 lg:px-12 lg:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-28 size-[520px] rounded-full bg-emerald-300/[0.055] blur-3xl"
        />
        <section className="relative grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:pb-24">
          <div className="max-w-4xl">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-emerald-200/70">
              <Network className="size-4" aria-hidden="true" />
              Ecosystem intelligence
            </p>
            <h1 className="mt-5 font-grotesk text-48 font-medium leading-[1.03] -tracking-wider md:text-64 lg:text-[78px]">
              See the organizations—and the people moving between them.
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-7 text-white/55 md:text-xl md:leading-8">
              Ecosystem Vision turns organization, project, fund, and GitHub
              work history into an explorable map. Find a company, inspect its
              maintainers, or watch an ecosystem grow and contract over time.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-black transition hover:bg-emerald-100"
                href={HREFS.PEOPLE_PAGE}
              >
                Explore people
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
                href={HREFS.SEARCH_PAGE}
              >
                <Search className="size-4" aria-hidden="true" />
                Search the ecosystem
              </Link>
            </div>
          </div>
          <div className="relative hidden min-h-64 items-center justify-center lg:flex">
            <div className="absolute size-60 rounded-full border border-emerald-200/10" />
            <div className="absolute size-44 rounded-full border border-violet-200/10" />
            <EcosystemMark className="relative size-48 drop-shadow-[0_0_42px_rgba(84,227,181,0.18)]" />
          </div>
        </section>

        <section className="py-16 lg:py-24" aria-labelledby="explore-heading">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
              Start with a question
            </p>
            <h2
              className="mt-2 font-grotesk text-32 font-medium tracking-tight md:text-40"
              id="explore-heading"
            >
              Four connected views of the ecosystem
            </h2>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {DISCOVERY_PATHS.map(({ title, description, href, icon: Icon }) => (
              <Link
                className="group flex min-h-48 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-emerald-200/25 hover:bg-white/[0.05] md:p-6"
                href={href}
                key={title}
              >
                <Icon className="size-5 text-emerald-200/75" aria-hidden="true" />
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-grotesk text-2xl font-medium">{title}</h3>
                    <ArrowRight
                      className="size-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <HomePeopleSnapshot />
      </main>
      <Footer />
    </ActiveSearchHiddenWrapper>
  </div>
);
