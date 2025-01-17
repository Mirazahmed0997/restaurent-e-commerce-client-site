import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';


const SearchComponent = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const axiosPublic=useAxiosPublic()
    console.log(searchTerm)

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form submission from refreshing the page
        try {
            const response = await axiosPublic.get(`menu/search?q=${encodeURIComponent(searchTerm)}`);
            setResults(response.data); // Update state with search results
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='text-black'>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search menu..."
                />
                <button type="submit">Search</button>
            </form>

            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((item) => (
                            <li key={item._id}>
                                {item.name} - ${item.price}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p></p>
                )}
            </div>
        </div>

    );
};

export default SearchComponent;