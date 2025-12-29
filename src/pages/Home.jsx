import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './Home.css'

function Home() {
    const {tagGroups } = useOutletContext()
    const navigate = useNavigate()

    const handleClick = (groupId) => {
        navigate(`/tags/${groupId}`)
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className="home-container">
            <div className="home-header">
                <h1 className="home-title">GroupTagger</h1>
            </div>

            <div className="tag-groups-section">
                <h2 className="section-title">Tag groups</h2>
                {tagGroups.length > 0 ? (
                    <ul className="tag-groups-grid">
                        {tagGroups.map((group, _index) => (
                            <li key={group.id}>
                                <div className="group-card" onClick={() => handleClick(group.id)}>
                                    <h3 className="group-name">{group.name}</h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <p className="empty-message">タググループがありません</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
