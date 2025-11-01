import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

function App() {
    const [tagGroups, setTagGroups] = useState([])

    useEffect(() => {
        const fetchGroups = async () => {
            const groups = await eagle.tagGroup.get()
            setTagGroups(groups)
        }
        
        eagle.onPluginRun(() => {
            fetchGroups()
        })
    }, [])

    return <Outlet context={{ tagGroups, setTagGroups }}/>
}

export default App
