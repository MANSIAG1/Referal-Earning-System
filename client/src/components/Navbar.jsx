import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="border-b border-gray-200 py-4 mb-8">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold tracking-widest uppercase">LuxeStream</Link>
                <div className="flex gap-4 items-center">
                    {user ? (
                        <>
                            <Link to="/shop" className="btn btn-outline text-sm">Shop</Link>
                            <Link to="/my-purchases" className="btn btn-outline text-sm">Orders</Link>
                            <Link to="/profile" className="btn btn-outline text-sm">Profile</Link>
                            <Link to="/earnings" className="btn btn-outline text-sm">Earnings</Link>
                            <Link to="/referrals" className="btn btn-outline text-sm">Referrals</Link>
                            <button onClick={handleLogout} className="btn btn-primary text-sm">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline text-sm">Login</Link>
                            <Link to="/signup" className="btn btn-primary text-sm">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
