import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import OurTeamPage from '../pages/our-team/page';
import BoardOfDirectorsPage from '../pages/board-of-directors/page';
import AuditCommitteePage from '../pages/audit-committee/page';
import NominationRemunerationCommitteePage from '../pages/nomination-remuneration-committee/page';

const HomePage = lazy(() => import('../pages/home/page'));
const AboutUsPage = lazy(() => import('../pages/about-us/page'));
const InvestorRelationsPage = lazy(() => import('../pages/investor-relations/page'));
const WhyGoSolarPage = lazy(() => import('../pages/why-go-solar/page'));
const CBGProductionPage = lazy(() => import('../pages/cbg-production/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const StakeholdersRelationshipCommitteePage = lazy(() => import('../pages/stakeholders-relationship-committee/page'));
const WorkingAtRefexPage = lazy(() => import('../pages/working-at-refex/page'));
const TermsConditionsPage = lazy(() => import('../pages/terms-conditions/page'));
const PrivacyPolicyPage = lazy(() => import('../pages/privacy-policy/page'));
const LegalDisclaimerPage = lazy(() => import('../pages/legal-disclaimer/page'));

const AdminLoginPage = lazy(() => import('../pages/admin-login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin-dashboard/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about-us',
    element: <AboutUsPage />,
  },
  {
    path: '/investor-relations',
    element: <InvestorRelationsPage />,
  },
  {
    path: '/why-go-solar',
    element: <WhyGoSolarPage />,
  },
  {
    path: '/cbg-production',
    element: <CBGProductionPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/our-team',
    element: <OurTeamPage />,
  },
  {
    path: '/board-of-directors',
    element: <BoardOfDirectorsPage />,
  },
  {
    path: '/audit-committee',
    element: <AuditCommitteePage />,
  },
  {
    path: '/nomination-remuneration-committee',
    element: <NominationRemunerationCommitteePage />,
  },
  {
    path: '/stakeholders-relationship-committee',
    element: <StakeholdersRelationshipCommitteePage />,
  },
  {
    path: '/working-at-refex',
    element: <WorkingAtRefexPage />,
  },
  {
    path: '/terms-conditions',
    element: <TermsConditionsPage />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicyPage />,
  },
  {
    path: '/legal-disclaimer',
    element: <LegalDisclaimerPage />,
  },
  {
    path: '/admin-login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin-dashboard',
    element: <AdminDashboardPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
