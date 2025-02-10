import { useEffect, useState } from "react"
import { fetchFilenames } from "../api"
import Loader from "./Loader"
import ErrorMessage from "./ErrorMessage"

export default function FileSelection() {

    const [filenames, setFilenames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchFilenames()
            .then(setFilenames)
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }, [])

    function render() {
        if (loading) return <Loader />
        if (error) return <ErrorMessage message={`Can't load strategies, reason: ${error.message}`} />
        return (
            <section id="data-selection">
                <span>Choose data file</span>
                <button id="upload-btn">
                    <i id="upload-icon" className="fa-solid fa-arrow-up-from-bracket icon"></i>
                    Upload File
                </button>
            </section>
        )
    }

    return render()

}