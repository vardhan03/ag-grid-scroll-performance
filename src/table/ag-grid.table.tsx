import { AgGridReact } from 'ag-grid-react'
import { ICellRendererParams, RowNode } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useEffect, useMemo, useState } from 'react'
// import HyperLink from '../a_atoms/link/hyperlink/hyperlink.atom'
import { Checkbox, FormControlLabel, Link } from '@material-ui/core'
import { Button } from '@material-ui/core'

function MyRenderer(params: ICellRendererParams) {
  return (
    <span style={{ marginLeft: '20px' }}>
      {/* <img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" style={{position: 'absolute', top: '0px', left: '0px', width: '40px'}}/> */}
      <Link underline="hover">{params.value}</Link>
      {/* <span>{params.value}</span> */}
    </span>
  )
}

export default function TestAgGrid() {

  const [rowBuffer, setRowBuffer] = useState<number>(10)
  const [isReactUi, setIsReactUi ] = useState<boolean>(true)
  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      { field: 'athlete' },
      { field: 'age', cellRendererFramework: MyRenderer },
      { field: 'country', cellRendererFramework: MyRenderer },
      { field: 'year', cellRendererFramework: MyRenderer },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ],
    []
  )

  // never changes, so we can use useMemo
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  )

  // changes, needs to be state
  const [rowData, setRowData] = useState<RowNode[]>()

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data))
  }, [])

  const handleRowBuffer = () => {
    setRowBuffer((prevState: any) => prevState + 10)
  }

  const handleRowBufferDec = () => {
    setRowBuffer((prevState: any) => prevState - 10)
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsReactUi(e.target.checked)
  } 

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Button onClick={handleRowBuffer} variant="outlined">Increase the row Buffer ( +10)</Button> &nbsp;&nbsp;
      <Button onClick={handleRowBufferDec} variant="outlined"> Decrease the row Buffer ( -10)</Button> &nbsp;&nbsp;
      <br />
      <FormControlLabel control={<Checkbox defaultChecked onChange={handleCheckbox}/>} label="Is React UI"></FormControlLabel>
      <span style={{fontWeight: 'bold'}}> Rowbuffer is: {rowBuffer} </span>
      <br /> <br/> <br/>
      <AgGridReact
        reactUi={isReactUi}
        rowBuffer={rowBuffer}
        className="ag-theme-alpine"
        animateRows={true}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        enableRangeSelection={true}
        rowData={rowData}
        rowSelection="multiple"
        suppressRowClickSelection={true}
      />
    </div>
  )
}
