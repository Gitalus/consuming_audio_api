import React, { useState } from 'react'
import { Footer } from './components/Footer'
import { Songs } from './components/Songs'

export const Reproducer = () => {
    const [selected, setSelected] = useState(null);

    return (
        <div className="container">
            <div className="list-songs">
                <Songs />
                <Songs />
                <Songs />
                <Songs />
            </div>
            <Footer selected={ selected } />
        </div>
    )
}
