
import FilterComponent from '../components/FilterComponent';
import JobList from '../components/JobListing';
import Header from '../components/Header';




const Announcement = () => {
    return (
        <div>
            {/* Header en haut de page */}
            <Header/>

            <div className="container mx-auto py-8 px-4">
                {/* Flexbox pour aligner les composants côte à côte */}
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* JobList à gauche (75% de largeur sur grand écran) */}
                    <div className="lg:w-1/4 w-full">
                    <FilterComponent/>
                    </div>

                    {/* FilterComponent à droite (25% de largeur sur grand écran) */}
                    <div className="lg:w-3/4 w-full">
                        <JobList/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
