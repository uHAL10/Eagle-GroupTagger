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
        const run = async () => {
            const fetchTags = async () => {
                const targetGroup = tagGroups.find(g => g.id === groupId)
                return targetGroup.tags
            }
    
            const fetchItems = async () => {
                let items = await eagle.item.getAll()
                let filteredItems = items.filter(item => {
                    console.log('item.name', item.name)
                    console.log('item.tags:', item.tags)
                    const hasCommonTag = item.tags.some(t => tagsInGroup.includes(t))
                    
                    return !hasCommonTag
                })
                return filteredItems
            }
    
            let tagsInGroup = await fetchTags()
            console.log('tagsInGroup:', tagsInGroup)
            let items = await fetchItems()
            console.log('items:', items)
    
            setTags(tagsInGroup)
        }
        run()
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
