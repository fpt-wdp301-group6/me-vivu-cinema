import { useLocation } from 'react-router-dom';

const useSearchQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default useSearchQuery;
