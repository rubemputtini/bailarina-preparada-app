import Nav from "../../../layouts/Nav";
import Footer from "../../../layouts/Footer";

const PageLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col text-white">
            <Nav />
            <main className="flex-grow m-auto max-w-7xl p-6">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;
