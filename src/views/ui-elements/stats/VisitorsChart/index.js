import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import YearLineChart from "../YearLineChart/"

const VisitorsChart = () => {

  const { colors } = useContext(ThemeColors)

  return <YearLineChart 
    title="visiteurs" 
    color={colors.warning.main} 
    dataUrl="http://localhost:5000/api/stats/visitors"
  />
}


export default VisitorsChart
