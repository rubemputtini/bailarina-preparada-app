import { Link } from "react-router-dom";
import header from "../assets/header-logo.webp";
import { ROUTES } from "shared/routes/routes";

const Header = () => {
    return (
        <header className="py-6 container mx-auto flex justify-center items-center px-4">
            <Link to={ROUTES.home} className="block">
                <img
                    src={header}
                    alt="Bailarina Preparada Logo"
                    className="h-auto w-48 md:w-56 lg:w-64 cursor-pointer block"
                />
            </Link>
        </header>
    );
};

export default Header;