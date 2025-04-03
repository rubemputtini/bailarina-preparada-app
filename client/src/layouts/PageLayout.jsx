import Nav from "./Nav";
import Footer from "./Footer";

const PageLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col text-white">
            <Nav />
            <main className="flex-grow p-6 w-full max-w-7xl mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;
