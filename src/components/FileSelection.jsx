import { useEffect, useState } from "react"
import { fetchFilesMetadata } from "../api"
import Loader from "./Loader"
import ErrorMessage from "./ErrorMessage"

export default function FileSelection() {

    const [filenames, setFilenames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchFilesMetadata()
            .then(setFilenames)
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const selectOptions = filenames.map(file => {
        const name = `${file.symbol}_${file.tf}`
        return (<option key={name} value={name}>{name}</option>)
    })

    function render() {
        if (loading) return <Loader />
        if (error) return <ErrorMessage message={`Can't load files metadata, reason: ${error.message}`} />
        return (
            <section id="data-selection">
                <span>Choose data file</span>
                <select name="files" id="files" >
                    {selectOptions}
                </select>
                
            </section>
        )
    }

    return render()

}