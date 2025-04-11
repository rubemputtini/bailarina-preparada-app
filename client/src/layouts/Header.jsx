import { Link } from "react-router-dom";
import header from "../assets/header-logo.webp";
import { ROUTES } from "shared/routes/routes";

const Header = () => {
    return (
        <header className="py-6 container mx-auto flex justify-center items-center px-4">
            <Link to={ROUTES.home} className="flex justify-center w-full">
                <img
                    src={header}
                    alt="Bailarina Preparada Logo"
                    className="h-auto w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
                />
            </Link>
        </header>
    );
};

export default Header;