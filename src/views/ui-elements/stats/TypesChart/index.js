import PieChart from "@src/views/ui-elements/stats/PieChart/"

const TypeChart = () => <PieChart 
    dataUrl="http://localhost:5000/api/stats/types" 
    title="types"
/>

export default TypeChart