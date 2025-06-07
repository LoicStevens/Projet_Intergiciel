import React from 'react';
import ProfileCompletion from '../components/ProfileCompletion';
import Footer from '../components/Footer';

const ProfileComplete = () => {
    return (
        <div>
              <div className="min-h-screen flex flex-col">
            {/* Header */}
          
                                                    
            {/* Contenu principal */}
            <div className="flex-grow my-4">
                <ProfileCompletion/>
            </div>

            {/* Footer */}
            <Footer />
        </div>
        </div>
    );
};

export default ProfileComplete;