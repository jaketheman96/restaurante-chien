import PortalInfos from '../components/PortalInfos';
import PortalNavbar from '../components/PortalNavbar';
import useUserValidator from '../hooks/useUserValidator';

function Portal() {
  useUserValidator();

  return (
    <>
      <PortalNavbar />
      <PortalInfos />
    </>
  );
}

export default Portal;
