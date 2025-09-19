import { useUser } from '@clerk/clerk-react'
import LandingPage from './LandingPage'

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser();

    // Attendre que Clerk termine le chargement
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-purple-400"></div>
                    <p className="text-white mt-4 text-lg">Chargement...</p>
                </div>
            </div>
        );
    }

    // Si l'utilisateur n'est pas connecté, afficher la landing page
    if (!isSignedIn) {
        return <LandingPage />;
    }

    // Si l'utilisateur est connecté, afficher le contenu protégé
    return <>{children}</>;
};

export default ProtectedRoute;