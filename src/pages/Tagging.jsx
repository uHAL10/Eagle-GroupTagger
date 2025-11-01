import { useOutletContext, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Tagging() {
    const { groupId } = useParams()
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    const { tagGroups } = useOutletContext()

    const handleClick = () => {
        navigate(`/`)
    }

    useEffect(() => {
        const fetchTags = async () => {
            const targetGroup = tagGroups.find(g => g.id === groupId)
            setTags(targetGroup.tags)
        }
        fetchTags()
    }, [groupId])

    return (
        <div>
            <button onClick={handleClick}>Home</button>
            <p>{tags.map((tag, index) => (
                <div key={index}>{tag}</div>
            ))}</p>
        </div>
    )
}

export default Tagging
