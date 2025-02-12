import { useEffect, useState } from "react"
import { fetchFilesMetadata } from "../api"
import Loader from "./Loader"
import ErrorMessage from "./ErrorMessage"

export default function FileSelection({ onChange }) {

    const [filesMetadata, setFilesMetadata] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const selectOptions = filesMetadata.map(file => {
        const name = `${file.symbol}_${file.tf}`
        return (<option key={name} value={name}>{name}</option>)
    })

    function handleFileSelected(event) {
        const selectedFile = event.target.value;
        const configData = filesMetadata.find(file => `${file.symbol}_${file.tf}` === selectedFile)
        onChange(configData)
    }

    useEffect(() => {
        fetchFilesMetadata()
            .then(setFilesMetadata)
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }, [])

    function render() {
        if (loading) return <Loader />
        if (error) return <ErrorMessage message={`Can't load files metadata, reason: ${error.message}`} />
        return (
            <section id="data-selection">
                <span>Choose data file</span>
                <select name="files" id="files" onChange={handleFileSelected}>
                    {selectOptions}
                </select>
            </section>
        )
    }

    return render()

}