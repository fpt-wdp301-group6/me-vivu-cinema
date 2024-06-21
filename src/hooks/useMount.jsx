import { useEffect } from 'react';

const useMount = (callback) => {
    useEffect(() => {
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useMount;
