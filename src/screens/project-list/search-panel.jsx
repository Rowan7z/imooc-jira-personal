import React, { useState } from 'react'

export const SearchPanel = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
  return (
    <form>
        {/* setParam(Object.assign({}, param, {name: evt.target.value})) */}
        <input type="text" value={param.name} onChange={evt => setParam({
            ...param, 
            name: evt.target.value
        })} />
        <select value={param.personId} onChange={evt => setParam({
            ...param, 
            personId: evt.target.value
        })}>
            <option value={''}>负责人xxx</option>
        </select>
    </form>
  )
}
