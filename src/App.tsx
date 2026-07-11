import { useMemo, useState } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Density, Mode } from '@cloudscape-design/global-styles';
import '@cloudscape-design/global-styles/index.css';
import AppLayoutToolbar from '@cloudscape-design/components/app-layout-toolbar';
import type { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import type { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
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

import { PERSONAS, type PersonaId } from './content/personas';
import { WIDGETS, PERSONA_DEFAULT_LAYOUT, allWidgetIds, widgetsWithFullPages, type WidgetId } from './content/widgets';
import Dashboard, { type BoardItemData } from './pages/Dashboard';
import WidgetFullPage from './pages/WidgetFullPage';
import AboutPage from './pages/AboutPage';
import { applyStoredSettings, useDisplaySettings } from './hooks/useDisplaySettings';

applyStoredSettings();

function makeBoardItem(widgetId: WidgetId): BoardItemData {
  const def = WIDGETS[widgetId];
  return {
    id: widgetId,
    columnSpan: def.columnSpan,
    rowSpan: def.rowSpan,
    data: { widgetId },
  };
}

const ADD_WIDGETS_DRAWER_ID = 'add-widgets';
const ABOUT_PATH = WIDGETS['about-me'].fullPagePath!;

const navItems: SideNavigationProps.Item[] = [
  { type: 'link', text: 'Dashboard', href: '/' },
  { type: 'divider' },
  {
    type: 'section',
    text: 'Full pages',
    items: widgetsWithFullPages().map((w) => ({ type: 'link', text: w.title, href: w.fullPagePath })),
  },
];

// Search covers the dashboard + every widget with a dedicated full page — titles only, per WIDGET-TRACKER.md.
const searchOptions: AutosuggestProps.Options = [
  { value: '/', label: 'Dashboard' },
  ...widgetsWithFullPages().map((w) => ({ value: w.fullPagePath, label: w.title })),
];

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const [personaId, setPersonaId] = useState<PersonaId>('recruiter');
  const [items, setItems] = useState<BoardItemData[]>(() => PERSONA_DEFAULT_LAYOUT.recruiter.map(makeBoardItem));
  const [activeDrawerId, setActiveDrawerId] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const { density, mode, setDensity, setMode } = useDisplaySettings();

  const persona = PERSONAS.find((p) => p.id === personaId)!;

  const onBoard = useMemo(() => new Set(items.map((item) => item.data.widgetId)), [items]);
  const availableToAdd = allWidgetIds().filter((id) => !onBoard.has(id));

  function switchPersona(next: PersonaId) {
    setPersonaId(next);
    setItems(PERSONA_DEFAULT_LAYOUT[next].map(makeBoardItem));
  }

  function addWidget(id: WidgetId) {
    setItems((prev) => [...prev, makeBoardItem(id)]);
  }

  function goTo(href: string) {
    setSearchValue('');
    navigate(href);
  }

  const currentFullPage = widgetsWithFullPages().find((w) => w.fullPagePath === location.pathname);
  const breadcrumbItems: Array<{ text: string; href: string }> =
    location.pathname === '/'
      ? [{ text: 'Dashboard', href: '/' }]
      : [{ text: 'Dashboard', href: '/' }, { text: currentFullPage?.title ?? location.pathname, href: location.pathname }];

  const utilities: TopNavigationProps.Utility[] = [
    {
      type: 'button',
      iconName: 'status-info',
      ariaLabel: 'About me',
      href: ABOUT_PATH,
      onFollow: (event) => {
        event.preventDefault();
        goTo(ABOUT_PATH);
      },
    },
    {
      type: 'menu-dropdown',
      iconName: 'settings',
      ariaLabel: 'Preferences',
      items: [
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
      ],
      onItemClick: ({ detail }) => {
        if (detail.id === 'mode-light') setMode(Mode.Light);
        if (detail.id === 'mode-dark') setMode(Mode.Dark);
        if (detail.id === 'density-comfortable') setDensity(Density.Comfortable);
        if (detail.id === 'density-compact') setDensity(Density.Compact);
      },
    },
    {
      type: 'menu-dropdown',
      text: persona.label,
      description: 'Viewing as',
      ariaLabel: 'Switch persona',
      items: PERSONAS.map((p) => ({ id: p.id, text: p.label, description: p.goal })),
      onItemClick: ({ detail }) => switchPersona(detail.id as PersonaId),
    },
  ];

  const drawers: AppLayoutProps.Drawer[] =
    location.pathname === '/'
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
        <TopNavigation
          identity={{
            title: 'David Trick',
            // Identity's onFollow can't preventDefault (Cloudscape API limitation), so the
            // href itself must be the real destination — a plain hash change, no SPA intercept needed.
            href: '#/',
          }}
          search={
            <Autosuggest
              value={searchValue}
              onChange={({ detail }) => setSearchValue(detail.value)}
              onSelect={({ detail }) => detail.selectedOption?.value && goTo(detail.selectedOption.value)}
              options={searchOptions}
              placeholder="Search the site"
              ariaLabel="Search the site"
              enteredTextLabel={(value) => `Use: "${value}"`}
            />
          }
          utilities={utilities}
          i18nStrings={{ searchIconAriaLabel: 'Search', searchDismissIconAriaLabel: 'Close search' }}
        />
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
            <Route path="/" element={<Dashboard items={items} onItemsChange={setItems} />} />
            {widgetsWithFullPages().map((w) => (
              <Route
                key={w.id}
                path={w.fullPagePath}
                element={w.id === 'about-me' ? <AboutPage /> : <WidgetFullPage widget={w} />}
              />
            ))}
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
