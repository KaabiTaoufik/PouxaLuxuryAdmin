import PieChart from "@src/views/ui-elements/stats/PieChart/"

const CategoriesChart = () => <PieChart 
    dataUrl="http://localhost:5000/api/stats/categories" 
    title="catégories"
/>

export default CategoriesChart
