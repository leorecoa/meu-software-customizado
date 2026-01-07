import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
            <aside>Sidebar</aside>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
