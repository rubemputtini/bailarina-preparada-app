import header from "../assets/header-logo.webp";

const Header = () => {
    return (
        <header className="py-6 container mx-auto flex justify-center items-center px-4">
            <img
                src={header}
                alt="Bailarina Preparada Logo"
                className="h-auto w-1/2 md:w-1/3 lg:w-1/4"
            />
        </header>
    );
};

export default Header;