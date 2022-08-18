import DataGrid from "./components/DataGrid"
import Nav from "./components/Nav"

function App() {

  return (
    <div className="w-full">
      <Nav></Nav>
      <div className="bg-white rounded w-11/12  mx-auto shadow mt-12 flex flex-col">
        <span className="w-full text-gray-700  py-1 px-3">
          <span className="font-semibold">Features Implemented :</span> Column Ordering, Column Chooser, Row Expansion
        </span>
        <DataGrid></DataGrid>
      </div>
    </div>
  )
}

export default App
