import { Navigate, Route, Routes } from 'react-router-dom';
import { PatientList } from '../pages';
import { PatientDetail } from "../pages/patient";
import { useAppThemeContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { toggleTheme } = useAppThemeContext();

    return (
        <Routes>
            <Route path='/patient' element={<PatientList />} />
            <Route path='/patient/detail/:id' element={<PatientDetail />} />

            <Route path='*' element={<Navigate to={'/patient'} />} />
        </Routes>
    );
};