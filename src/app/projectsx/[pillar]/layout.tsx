import { PillarRoutesContextProvider } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <PillarRoutesContextProvider>{children}</PillarRoutesContextProvider>;
};
export default Layout;
