import { useEffect, useState } from "react"

const useReviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        fetch('https://restaurent-e-commerce-server-lrltgsmhl-mirazahmed0997s-projects.vercel.app/?vercelToolbarCode=1PZkp2uCvJ50xtNreviews')
            .then(res => res.json())
            .then(data => {

                setReviews(data)
               setLoading(false)
            }
            )
    }, [])
    return [reviews,loading]
}

export default useReviews