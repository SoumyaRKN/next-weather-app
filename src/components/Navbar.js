import React, { useContext } from 'react';
import weatherContext from '@/context/weathercontext';
import Link from 'next/link';

const Navbar = () => {
    const { setWeatherData } = useContext(weatherContext);

    const getWeatherData = async (latitude, longitude) => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCurrentLocationWeather`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cityFlag: false,
                lat: latitude,
                lon: longitude
            })
        }).then(response => response.json()).then(res => {
            if (res.success) {
                setWeatherData(res.data);
            } else {
                alert(res.error);
            }
        }).catch(error => console.error('Error:', error));
    }

    const handelSearch = async (city) => {
        if (city === "") {
            alert("Please enter a value!")
        } else {
            fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCurrentLocationWeather`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cityFlag: true,
                    city: city
                })
            }).then(response => response.json()).then(res => {
                console.log(res);
                if (res.success) {
                    setWeatherData(res.data);
                } else {
                    alert(res.error);
                }
            }).catch(error => console.error('Error:', error));
        }
    }

    return (
        <div className="navbar bg-indigo-400 sticky top-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-indigo-200 rounded-box w-52">
                        <li><Link href={"/"}>Home</Link></li>
                        <li tabIndex={0}>
                            <details>
                                <summary>Popular Location</summary>
                                <ul className="p-2">
                                    <li><a onClick={() => { getWeatherData(28.704060, 77.102493) }}>Delhi</a></li>
                                    <li><a onClick={() => { getWeatherData(19.075983, 72.877655) }}>Mumbai</a></li>
                                    <li><a onClick={() => { getWeatherData(20.296059, 85.824539) }}>Bhubaneswar</a></li>
                                    <li><a onClick={() => { getWeatherData(12.971599, 77.594566) }}>Bangalore</a></li>
                                    <li><a onClick={() => { getWeatherData(17.443649, 78.528786) }}>Hyderabad</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>About</a></li>
                    </ul>
                </div>
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">Weather App</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href={"/"}>Home</Link></li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Popular Location</summary>
                            <ul className="p-2">
                                <li><a onClick={() => { getWeatherData(28.704060, 77.102493) }}>Delhi</a></li>
                                <li><a onClick={() => { getWeatherData(19.075983, 72.877655) }}>Mumbai</a></li>
                                <li><a onClick={() => { getWeatherData(20.296059, 85.824539) }}>Bhubaneswar</a></li>
                                <li><a onClick={() => { getWeatherData(12.971599, 77.594566) }}>Bangalore</a></li>
                                <li><a onClick={() => { getWeatherData(17.443649, 78.528786) }}>Hyderabad</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><Link href={"/about"}>About</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex items-center">
                    <form onSubmit={(e) => { e.preventDefault(); handelSearch(document.getElementById("cityName").value); e.target.reset; }}>
                        <input type="text" className="input input-sm input-bordered w-24 md:w-auto me-2" placeholder="Enter City Name" id="cityName" />
                        <button type='submit' className="btn btn-sm btn-outline btn-neutral">Search</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Navbar;