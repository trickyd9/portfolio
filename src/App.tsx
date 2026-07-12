import { useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Density, Mode } from '@cloudscape-design/global-styles';
import '@cloudscape-design/global-styles/index.css';
import AppLayoutToolbar from '@cloudscape-design/components/app-layout-toolbar';
import type { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Autosuggest from '@cloudscape-design/components/autosuggest';
import type { AutosuggestProps } from '@cloudscape-design/components/autosuggest';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import type { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import Drawer from '@cloudscape-design/components/drawer';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import type { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';

import { PERSONAS, type PersonaId } from './content/personas';
import { WIDGETS, allWidgetIds, widgetsWithFullPages, type WidgetId } from './content/widgets';
import { defaultLayoutFor, boardItemFor } from './content/layouts';
import type { BoardItemData } from './content/boardItem';
import Dashboard from './pages/Dashboard';
import WidgetFullPage from './pages/WidgetFullPage';
import AboutPage from './pages/AboutPage';
import FeaturedProjectsPage from './pages/FeaturedProjectsPage';
import PersonaResearchPage from './pages/PersonaResearchPage';
import DesignSystemsPage from './pages/DesignSystemsPage';
import AiAugmentedBuildPage from './pages/AiAugmentedBuildPage';
import { applyStoredSettings, useDisplaySettings } from './hooks/useDisplaySettings';

applyStoredSettings();

const ADD_WIDGETS_DRAWER_ID = 'add-widgets';
const ABOUT_PATH = WIDGETS['about-me'].fullPagePath!;
const ROLE_TITLE = 'Design Technologist';

const resumeItems: ButtonDropdownProps.Items = [
  { id: 'pdf', text: 'Download as PDF', href: `${import.meta.env.BASE_URL}David-Trick-Resume.pdf`, download: 'David-Trick-Resume.pdf' },
  { id: 'md', text: 'Download as Markdown', href: `${import.meta.env.BASE_URL}David-Trick-Resume.md`, download: 'David-Trick-Resume.md' },
];

// Widgets with a bespoke full page (richer than the generic WidgetFullPage
// placeholder) — anything not listed here falls back to WidgetFullPage.
const BESPOKE_FULL_PAGES: Partial<Record<WidgetId, ComponentType>> = {
  'about-me': AboutPage,
  'featured-projects': FeaturedProjectsPage,
  'persona-research-showcase': PersonaResearchPage,
  'design-systems-standards': DesignSystemsPage,
  'ai-augmented-build': AiAugmentedBuildPage,
};

// Phase 0b: the static nav (About Me home, Projects group, visual portfolio)
// plus the persona-driven widget dashboard re-linked at /dashboard — hand
// specified rather than derived generically from widgetsWithFullPages(),
// since the order/grouping here don't match that list's natural shape and
// /dashboard isn't a widget's full page. See WIDGET-TRACKER.md.
const navItems: SideNavigationProps.Item[] = [
  { type: 'link', text: 'About Me', href: WIDGETS['about-me'].fullPagePath! },
  { type: 'link', text: 'Dashboard', href: '/dashboard' },
  {
    type: 'section',
    text: 'Projects',
    items: [
      { type: 'link', text: 'Featured Projects', href: WIDGETS['featured-projects'].fullPagePath! },
      { type: 'link', text: 'Persona-Driven Research', href: WIDGETS['persona-research-showcase'].fullPagePath! },
      { type: 'link', text: 'Design Systems & Standards', href: WIDGETS['design-systems-standards'].fullPagePath! },
      { type: 'link', text: 'AI-Augmented Build', href: WIDGETS['ai-augmented-build'].fullPagePath! },
    ],
  },
  { type: 'link', text: 'University Visual Portfolio', href: WIDGETS['art-visual-portfolio'].fullPagePath! },
];

// Search covers every widget with a dedicated full page, plus the dashboard itself.
const searchOptions: AutosuggestProps.Options = [
  { value: '/dashboard', label: 'Dashboard' },
  ...widgetsWithFullPages().map((w) => ({ value: w.fullPagePath, label: w.title })),
];

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const [personaId, setPersonaId] = useState<PersonaId>('recruiter');
  const [items, setItems] = useState<BoardItemData[]>(() => defaultLayoutFor('recruiter'));
  const [activeDrawerId, setActiveDrawerId] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const { density, mode, setDensity, setMode } = useDisplaySettings();

  const persona = PERSONAS.find((p) => p.id === personaId)!;

  const onBoard = useMemo(() => new Set(items.map((item) => item.data.widgetId)), [items]);
  const availableToAdd = allWidgetIds().filter((id) => !onBoard.has(id));

  function switchPersona(next: PersonaId) {
    setPersonaId(next);
    setItems(defaultLayoutFor(next));
  }

  function addWidget(id: WidgetId) {
    setItems((prev) => [...prev, boardItemFor(id)]);
  }

  function goTo(href: string) {
    setSearchValue('');
    navigate(href);
  }

  const currentFullPage = widgetsWithFullPages().find((w) => w.fullPagePath === location.pathname);
  const currentPageTitle = location.pathname === '/dashboard' ? 'Dashboard' : currentFullPage?.title ?? location.pathname;
  const breadcrumbItems: Array<{ text: string; href: string }> =
    location.pathname === '/'
      ? [{ text: 'About Me', href: '/' }]
      : [{ text: 'About Me', href: '/' }, { text: currentPageTitle, href: location.pathname }];

  const preferencesItems: ButtonDropdownProps.Items = [
    {
      text: 'Appearance',
      items: [
        { id: 'mode-light', text: 'Light', itemType: 'checkbox', checked: mode === Mode.Light },
        { id: 'mode-dark', text: 'Dark', itemType: 'checkbox', checked: mode === Mode.Dark },
      ],
    },
    {
      text: 'Density',
      items: [
        { id: 'density-comfortable', text: 'Comfortable', itemType: 'checkbox', checked: density === Density.Comfortable },
        { id: 'density-compact', text: 'Compact', itemType: 'checkbox', checked: density === Density.Compact },
      ],
    },
  ];

  function onPreferencesItemClick({ detail }: { detail: ButtonDropdownProps.ItemClickDetails }) {
    if (detail.id === 'mode-light') setMode(Mode.Light);
    if (detail.id === 'mode-dark') setMode(Mode.Dark);
    if (detail.id === 'density-comfortable') setDensity(Density.Comfortable);
    if (detail.id === 'density-compact') setDensity(Density.Compact);
  }

  const drawers: AppLayoutProps.Drawer[] =
    location.pathname === '/dashboard'
      ? [
          {
            id: ADD_WIDGETS_DRAWER_ID,
            trigger: { iconName: 'add-plus' },
            ariaLabels: {
              drawerName: 'Add widgets',
              triggerButton: 'Add widgets',
              closeButton: 'Close add widgets drawer',
            },
            content: (
              <Drawer header={<Header variant="h2">More widgets</Header>}>
                <SpaceBetween size="s">
                  <Box variant="p" color="text-status-inactive">
                    Not currently on your dashboard.
                  </Box>
                  {availableToAdd.length === 0 && (
                    <Box color="text-status-inactive">Every widget is already on the dashboard.</Box>
                  )}
                  {availableToAdd.map((id) => (
                    <Button key={id} fullWidth onClick={() => addWidget(id)}>
                      + {WIDGETS[id].title}
                    </Button>
                  ))}
                </SpaceBetween>
              </Drawer>
            ),
          },
        ]
      : [];

  return (
    <>
      <div id="top-nav">
        {/* TopNavigation's `identity` slot is title-only text — it can't hold the
            nested name/role/divider/dropdown cluster David wants, and `utilities`
            always render past the search box, not left-aligned next to identity.
            `children` replaces all of TopNavigation's structured content, so this
            hand-builds the whole bar; `visualContext` still gives it the dark
            background and auto color adaptation. Tradeoff: loses TopNavigation's
            built-in narrow-viewport utility-overflow collapsing. */}
        <TopNavigation visualContext="top-navigation">
          <div className="top-nav-bar">
            <div className="top-nav-identity">
              <a href="#/" className="top-nav-identity-link">
                <Box variant="strong" fontSize="heading-s">
                  David Trick
                </Box>
                <span className="top-nav-role">{ROLE_TITLE}</span>
              </a>
              <span className="top-nav-divider" aria-hidden="true">
                |
              </span>
              <span className="inline-dropdown">
                <ButtonDropdown variant="normal" items={resumeItems} ariaLabel="Download resume">
                  Resume
                </ButtonDropdown>
              </span>
            </div>
            <div className="top-nav-search">
              <Autosuggest
                value={searchValue}
                onChange={({ detail }) => setSearchValue(detail.value)}
                onSelect={({ detail }) => detail.selectedOption?.value && goTo(detail.selectedOption.value)}
                options={searchOptions}
                placeholder="Search the site"
                ariaLabel="Search the site"
                enteredTextLabel={(value) => `Use: "${value}"`}
              />
            </div>
            <div className="top-nav-utilities">
              <Button
                variant="icon"
                iconName="status-info"
                ariaLabel="About me"
                href={ABOUT_PATH}
                onFollow={(event) => {
                  event.preventDefault();
                  goTo(ABOUT_PATH);
                }}
              />
              <ButtonDropdown
                variant="icon"
                iconName="settings"
                ariaLabel="Preferences"
                items={preferencesItems}
                onItemClick={onPreferencesItemClick}
              />
              {/* Persona switching only affects the dashboard's board layout, so this
                  stays scoped to the /dashboard route rather than showing site-wide
                  (see WIDGET-TRACKER.md). */}
              {location.pathname === '/dashboard' && (
                <span className="inline-dropdown">
                  <ButtonDropdown
                    variant="normal"
                    ariaLabel="Switch persona"
                    items={PERSONAS.map((p) => ({ id: p.id, text: p.label, description: p.goal }))}
                    onItemClick={({ detail }) => switchPersona(detail.id as PersonaId)}
                  >
                    {persona.label}
                  </ButtonDropdown>
                </span>
              )}
            </div>
          </div>
        </TopNavigation>
      </div>
      <AppLayoutToolbar
        headerSelector="#top-nav"
        breadcrumbs={
          <BreadcrumbGroup
            items={breadcrumbItems}
            onFollow={(event) => {
              event.preventDefault();
              goTo(event.detail.href);
            }}
          />
        }
        navigation={
          <SideNavigation
            header={{ text: 'David Trick', href: '/' }}
            activeHref={location.pathname}
            items={navItems}
            onFollow={(event) => {
              event.preventDefault();
              navigate(event.detail.href);
            }}
          />
        }
        drawers={drawers}
        activeDrawerId={activeDrawerId}
        onDrawerChange={({ detail }) => setActiveDrawerId(detail.activeDrawerId)}
        contentType="dashboard"
        content={
          <Routes>
            <Route path="/dashboard" element={<Dashboard items={items} onItemsChange={setItems} />} />
            {widgetsWithFullPages().map((w) => {
              const BespokePage = BESPOKE_FULL_PAGES[w.id];
              return (
                <Route
                  key={w.id}
                  path={w.fullPagePath}
                  element={BespokePage ? <BespokePage /> : <WidgetFullPage widget={w} />}
                />
              );
            })}
          </Routes>
        }
      />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
