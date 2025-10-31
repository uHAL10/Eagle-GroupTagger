import { useState, useEffect } from 'react'

function App() {
    const [plugin, setPlugin] = useState(null)
    const [tagGroups, setTagGroups] = useState([])

    useEffect(() => {
        eagle.onPluginCreate((pluginInfo) => {
            console.log('eagle.onPluginCreate')
            console.log(pluginInfo)
            setPlugin(pluginInfo)
        })

        eagle.onPluginShow(async () => {
            console.log('eagle.onPluginShow')
            try {
                const groups = await eagle.tagGroup.get()
                console.log('取得したタググループ: ', groups)
                setTagGroups(groups)
            } catch (error) {
                console.error('タググループの取得に失敗しました: ', error)
            }
        })

        eagle.onPluginHide(() => {
            console.log('eagle.onPluginHide')
        })

    }, [])

    return (
        <div>
            <h1>GroupTagger</h1>

            <div>
                <h2>タググループ</h2>
                {tagGroups.length > 0 ? (
                    <ul>
                        {tagGroups.map((group, index) => (
                            <li key={index}>{group.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>タググループがありません</p>
                )}
            </div>
        </div>
    )
}

export default App
