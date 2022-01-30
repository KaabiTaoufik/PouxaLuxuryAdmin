import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import YearLineChart from "../YearLineChart/"

const ClientsChart = () => {

  const { colors } = useContext(ThemeColors)

  return <YearLineChart 
    title="clients" 
    color={colors.info.main} 
    dataUrl="http://localhost:5000/api/stats/clients"
  />
}


export default ClientsChart
