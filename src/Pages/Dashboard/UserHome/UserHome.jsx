import React from 'react';
import UseAuth from '../../../Hooks/Auth/UseAuth';

const UserHome = () => {
    const {user}=UseAuth();
    return (
        <div className='text-3xl'>
            <span>HI,</span>
            {
                user?.displayName ? user.displayName : ''
            }

        </div>
    );
};

export default UserHome;