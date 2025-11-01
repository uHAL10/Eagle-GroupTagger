import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Home() {
    const {tagGroups } = useOutletContext()
    const navigate = useNavigate()

    const handleClick = (groupId) => {
        navigate(`/tags/${groupId}`)
    }

    useEffect(() => {
        
    }, [])

    return (
        <div>
            <h1>GroupTagger</h1>

            <div>
                <h2>タググループ</h2>
                {tagGroups.length > 0 ? (
                    <ul>
                        {tagGroups.map((group, index) => (
                            <button onClick={() => handleClick(group.id)}>
                                {group.name}
                            </button>
                        ))}
                    </ul>
                ) : (
                    <p>タググループがありません</p>
                )}
            </div>
        </div>
    )
}

export default Home
