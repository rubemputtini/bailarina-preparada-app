import { socialMedia } from "../utils/constants";
import footer from "../assets/footer-logo.webp";

const Footer = () => {
    return (
        <footer className="py-4 mt-8 bg-gray-900 text-white">
            <div className="container mx-auto text-center px-4">
                <img
                    src={footer}
                    alt="Bailarina Preparada Logo"
                    className="h-12 mx-auto mb-6"
                />
                <div className="flex justify-center space-x-8 mb-6">
                    {socialMedia.map((social) => (
                        <a
                            key={social.id}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80"
                        >
                            <img src={social.icon} alt={social.id} className="h-8 w-8" />
                        </a>
                    ))}
                </div>
                <p className="mb-4 text-sm text-gray-400">
                    Bailarina Preparada &copy; {new Date().getFullYear()}. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;