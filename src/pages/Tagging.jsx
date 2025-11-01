import { useOutletContext, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './Tagging.css'

function Tagging() {
    const { groupId } = useParams()
    const [tags, setTags] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()
    const { tagGroups } = useOutletContext()

    const handleClick = () => {
        navigate(`/`)
    }

    const handleTagClick = async (tag) => {
        let currentItem = filteredItems[currentIndex]

        // すでに含まれていないタグであることを確認して、タグを追加
        if (!currentItem.tags.includes(tag)) {
            currentItem.tags.push(tag)
        }
        await currentItem.save()

        setCurrentIndex(currentIndex + 1)
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
            let filteredItems = await fetchItems()
            console.log('filteredItems:', filteredItems)
    
            setTags(tagsInGroup)
            setFilteredItems(filteredItems)
        }
        run()
    }, [groupId])

    return (
        <div>
            <button onClick={handleClick}>Home</button>

            {filteredItems.length > 0 ? (
                <div>
                    <img src={filteredItems[currentIndex].fileURL} className='tagging-image' />
                    <p>progress: {currentIndex + 1} / {filteredItems.length}</p>
                </div>
            ): (
                <div>
                    <p>completed.</p>
                </div>
            )
            }

            <p>
                {tags.map((tag, _index) => (
                    <button onClick={() => handleTagClick(tag)}>{tag}</button>
                ))}
                <button onClick={() => setCurrentIndex(currentIndex + 1)}>skip</button>
            </p>
        </div>
    )
}

export default Tagging
