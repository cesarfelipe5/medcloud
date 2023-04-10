import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages';
import { useAppThemeContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { toggleTheme } = useAppThemeContext();

    return (
        <Routes>
            <Route path='/patient' element={<Dashboard />} />
            {/* <Button variant='contained' color='primary' onClick={toggleTheme}> Toggle Theme </Button>} /> */}
            <Route path='/patient/detalhe/:id' element={<Dashboard />} />

            <Route path='*' element={<Navigate to={'/patient'} />} />
        </Routes>
    );
};