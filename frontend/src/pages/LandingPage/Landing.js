import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <Link className="signup-link" to="/signup">
                Create Account
            </Link>
        </div>
    )
}

export default Landing