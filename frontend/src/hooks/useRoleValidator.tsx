import { useNavigate } from 'react-router-dom';

function useRoleValidator() {
  const navigate = useNavigate();

  const roleValidator = (userRole: string) => {
    switch (userRole) {
      case 'customer':
        navigate('/portal');
        break;
      case 'employee':
        navigate('/orders');
        break;
      default:
        navigate('/admin');
        break;
    }
  };
  return { roleValidator };
}

export default useRoleValidator;
