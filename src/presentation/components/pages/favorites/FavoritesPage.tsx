import {useEffect, useState } from "react"
import useAppState from "../../../global_states/appState"
import DrugInitialData from "../../../../infrastrucure/drug/DrugInitialData"
import DrugsList from "../drugs/drugs_list/DrugsList"




const FavoritesPage: React.FC = () => {
    const { drugsInitialData } = useAppState()
    const [favoriteDrugs, setFavoriteDrugs] = useState<DrugInitialData[]>([])
  
    useEffect(() => {
      const favorites = drugsInitialData.filter((drug) => drug.favorite)
      setFavoriteDrugs(favorites)
    }, [drugsInitialData])
  
    return (
      <div className='flex flex-col gap-5'>
        <h1 className='text-3xl font-bold text-secondary'>Favoritos</h1>
        <DrugsList 
        drugsInitialData={favoriteDrugs} />
      </div>
    )
  }
  
  export default FavoritesPage