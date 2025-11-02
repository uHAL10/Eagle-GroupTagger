import { useOutletContext, useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import './Tagging.css'

function Tagging() {
    const { groupId } = useParams()
    const [tags, setTags] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [history, setHistory] = useState([])
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

        setHistory([...history, {item: currentItem, added_tag: tag}])

        setCurrentIndex(currentIndex + 1)
    }

    const handleSkipClick = () => {
        const currentItem = filteredItems[currentIndex]
        setHistory([...history, {item: currentItem, added_tag: 'skip'}])
        setCurrentIndex(currentIndex + 1)
    }

    const handleUndoClick = async () => {
        if (history.length == 0 || currentIndex == 0) return

        const newHistory = history.slice(0, -1)
        const lastOperation = history[history.length - 1]

        const prevIndex = currentIndex - 1
        const prevItem = filteredItems[prevIndex] 

        if (lastOperation.added_tag != 'skip') {
            const index = prevItem.tags.indexOf(lastOperation.added_tag)
            if (index > -1) {
                prevItem.tags.splice(index, 1)
            }
            await prevItem.save()
        } else {
            // do nothing
        }
        
        setHistory(newHistory)
        setCurrentIndex(currentIndex - 1)
    }

    const handleKeyDown = useCallback((e) => {
        // 数字キー（1-9）でタグを追加
        if (e.key >= '1' && e.key <= '9') {
            const tagIndex = parseInt(e.key) - 1
            if (tagIndex < tags.length && filteredItems.length > 0) {
                e.preventDefault()
                handleTagClick(tags[tagIndex])
            }
        }
        // ']' キーでスキップ
        else if (e.key.toLowerCase() === ']' && filteredItems.length > 0) {
            e.preventDefault()
            handleSkipClick()
        }
        // '[' キーでアンドゥ
        else if (e.key.toLowerCase() === '[') {
            e.preventDefault()
            handleUndoClick()
        }
    }, [tags, filteredItems, history, currentIndex, handleTagClick, handleSkipClick, handleUndoClick, handleClick])

    const getOffsetImgURL = (offset) => {
        if (currentIndex + offset < 0) return
        return filteredItems[currentIndex + offset].thumbnailURL
    }

    const getPrevTag = (offset) => {
        if (history.length - offset < 0) return
        return history[history.length - offset].added_tag
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

    useEffect(() => {
        // キーボードイベントリスナーを登録
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    return (
        <div>
            <button onClick={handleClick}>Home</button>

                        {filteredItems.length > 0 ? (
                <div>
                    <div className='image-gallery'>
                        <div className='image-container'>
                            <img src={getOffsetImgURL(-2)} className='small-image' />
                            <div>{getPrevTag(2)}</div>
                        </div>
                        <div className='image-container'>
                            <img src={getOffsetImgURL(-1)} className='small-image' />
                            <div>{getPrevTag(1)}</div>
                        </div>
                        <div className='image-container'>
                            <img src={filteredItems[currentIndex].thumbnailURL} className='tagging-image' />
                        </div>
                        <div className='image-container'>
                            <img src={getOffsetImgURL(1)} className='small-image' />
                        </div>
                        <div className='image-container'>
                            <img src={getOffsetImgURL(2)} className='small-image' />
                        </div>
                    </div>
                    <p>progress: {currentIndex + 1} / {filteredItems.length}</p>
                </div>
            ): (
                <div>
                    <p>completed.</p>
                </div>
            )
            }

            <p>
                {tags.map((tag, index) => (
                    <button key={tag} onClick={() => handleTagClick(tag)}>
                        {tag} ({index + 1})
                    </button>
                ))}
                <button onClick={() => handleSkipClick()}>skip (])</button>
            </p>
            <div>
                <button
                    onClick={() => handleUndoClick()}
                    disabled={history.length == 0 || currentIndex == 0}
                >
                    undo ([)
                </button>
            </div>
        </div>
    )
}

export default Tagging
