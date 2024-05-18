import React from 'react'
import Stack from '@mui/material/Stack';
import LangSel from './LangSel'
import "./Structure.css"
function Structure() {
  return (
    <div className="case">
        <Stack direction="row" className='hell'>
            <LangSel defFromlang="en-GB" defToLang='en-GB'/>
        </Stack> 
    </div>

  )
}

export default Structure
