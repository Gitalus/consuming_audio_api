import React from 'react'

export const Song = ({ data, handlePlay })  => {
    return (
        <div className="songs" onClick={ () => handlePlay(data) }>
            { data.name }
        </div>
    )
}
